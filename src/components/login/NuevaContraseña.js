import {
  Box,
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
  makeStyles,
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

export function NuevaContraseña() {
  const [nuevaContrasenia, setNuevaContrasenia] = useState({
    contrasenia: '',
    confirmarContrasenia: '',
  });
  const [iconoCargando, setIconoCargando] = useState(false);
  const history = useHistory();
  const { token } = useParams();
  const { create } = useApi('usuarios/recuperar');

  ValidatorForm.addValidationRule(
    'isPasswordMatch',
    (value) => value === nuevaContrasenia.contrasenia
  );

  ValidatorForm.addValidationRule('contraseñaValida', (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(String(value))
  );

  const cambiarContraseña = async () => {
    try {
      setIconoCargando(true);
      await create(nuevaContrasenia);
    } catch (error) {
      console.log(error);
    } finally {
      setIconoCargando(false);
    }
  };

  const handleChange = (e) => {
    setNuevaContrasenia({
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
                value={nuevaContrasenia.contrasenia}
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
                name="confirmarContraseña"
                type="password"
                fullWidth
                onChange={handleChange}
                value={nuevaContrasenia.confirmarContrasenia}
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

function LoadingPage() {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
