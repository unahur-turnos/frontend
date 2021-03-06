import {
  Box,
  Grid,
  Typography,
  InputAdornment,
  Button,
} from '@material-ui/core';
import { useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory, useParams } from 'react-router';
import LockIcon from '@material-ui/icons/Lock';
import { ERRORES } from '../textos/Textos';
import { useApi } from '../../utils/fetchApi';
import { BotonGuardar } from '../ui/BotonGuardar';
import { rutaInicialUsuario, usuarioState } from '../../state/usuario';
import { useSetRecoilState } from 'recoil';

export function NuevaContraseña() {
  const { dni, token } = useParams();
  const history = useHistory();
  const { create } = useApi('usuarios/credenciales', token);
  const setUsuario = useSetRecoilState(usuarioState);

  const [valoresUsuario, setValoresUsuario] = useState({
    dni: dni,
    contrasenia: '',
  });
  const [confirmarContrasenia, setConfirmarContrasenia] = useState('');
  const [iconoCargando, setIconoCargando] = useState(false);
  const [hayError, setHayError] = useState(false);

  ValidatorForm.addValidationRule(
    'isPasswordMatch',
    (value) => value === valoresUsuario.contrasenia
  );

  ValidatorForm.addValidationRule('contraseñaValida', (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(String(value))
  );

  const cambiarContraseña = async () => {
    try {
      setIconoCargando(true);
      setHayError(false);
      const usuario = await create(valoresUsuario);
      setUsuario(usuario);
      history.push(rutaInicialUsuario(usuario));
    } catch (error) {
      setHayError(true);
    } finally {
      setIconoCargando(false);
    }
  };

  const handleChange = (e) => {
    setValoresUsuario({
      ...valoresUsuario,
      [e.target.name]: e.target.value,
    });
  };

  const volverAlLogin = () => {
    history.push('/login');
  };

  return (
    <>
      <Box mt={5} display="flex" justifyContent="center">
        <Typography variant="h4" color="primary">
          Recuperar contraseña
        </Typography>
      </Box>
      <ValidatorForm onSubmit={cambiarContraseña} instantValidate={false}>
        <Grid container spacing={2} align="center">
          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4} style={{ marginTop: 20 }}>
              <TextValidator
                id="contraseniaUsuario"
                label="Nueva contraseña"
                name="contrasenia"
                type="password"
                fullWidth
                helperText="Mínimo 8 caracteres, con minúsculas, mayúsculas y números"
                onChange={handleChange}
                value={valoresUsuario.contrasenia}
                validators={['required', 'contraseñaValida']}
                errorMessages={[ERRORES.requerido, ERRORES.contrasenia]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                id="confirmarContraseña"
                label="Repetí tu contraseña"
                name="confirmarContrasenia"
                type="password"
                fullWidth
                onChange={(e) => {
                  setConfirmarContrasenia(e.target.value);
                }}
                value={confirmarContrasenia}
                validators={['required', 'isPasswordMatch']}
                errorMessages={[
                  ERRORES.requerido,
                  ERRORES.contraseniasNoCoinciden,
                ]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        {hayError && (
          <Grid align="center" style={{ marginTop: 20 }}>
            <Typography color="error">{ERRORES.expiracionToken}</Typography>
          </Grid>
        )}
        <Grid container spacing={1} style={{ marginTop: 20 }}>
          <Grid item xs={6} align="right">
            <Button onClick={volverAlLogin}>Cancelar</Button>
          </Grid>
          <Grid item xs={6}>
            <BotonGuardar loading={iconoCargando} />
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}
