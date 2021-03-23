import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import React, { useState } from 'react';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useApi } from '../../utils/fetchApi';
import { useSetRecoilState } from 'recoil';
import { rutaInicialUsuario, usuarioState } from '../../state/usuario';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ERRORES } from '../textos/Textos';
import { useInputStyles } from '../../utils/numberFieldWithoutArrows';
import { BotonGuardar } from '../ui/BotonGuardar';

export default function Login() {
  const inputClasses = useInputStyles();
  const history = useHistory();
  const { create } = useApi('usuarios/login');

  const [showPassword, setshowPassword] = useState(false);
  const [tengoErrorEn, setTengoErrorEn] = useState({
    dni: false,
    contrasenia: false,
    mandarError: false,
  });
  const [cargando, setCargando] = useState(false);

  const [valoresUsuario, setValoresUsuario] = useState({
    dni: '',
    contrasenia: '',
  });

  const setUsuario = useSetRecoilState(usuarioState);

  const handleChange = (e) => {
    setValoresUsuario({
      ...valoresUsuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const irARegistro = () => {
    history.push('/registro');
  };

  const validarLogin = async () => {
    setTengoErrorEn({ ...tengoErrorEn, mandarError: false });
    setCargando(true);

    try {
      const usuario = await create(valoresUsuario);
      setUsuario(usuario);
      history.push(rutaInicialUsuario(usuario));
    } catch (error) {
      setCargando(false);
      setTengoErrorEn({ ...tengoErrorEn, mandarError: true });
    }
  };

  return (
    <ValidatorForm onSubmit={validarLogin} instantValidate={false}>
      <Box mt={5} display="flex" justifyContent="center">
        <Typography variant="h4" color="primary">
          Iniciar sesión
        </Typography>
      </Box>

      <Grid container spacing={4} align="center">
        <Grid item xs={12}>
          <Grid item xs={9} sm={7} md={4} style={{ marginTop: 20 }}>
            <TextValidator
              id="dni"
              label="Ingresá tu documento"
              onChange={handleChange}
              name="dni"
              type="number"
              className={inputClasses.numberFieldWithoutArrows}
              fullWidth
              value={valoresUsuario.dni}
              validators={[
                'required',
                'minNumber:1000000',
                'maxNumber:99999999',
              ]}
              errorMessages={[ERRORES.requerido, ERRORES.dni, ERRORES.dni]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AssignmentIndIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={9} sm={7} md={4}>
            <TextValidator
              id="contrasenia"
              label="Ingresá tu contraseña"
              name="contrasenia"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
              fullWidth
              value={valoresUsuario.contrasenia}
              validators={['required']}
              errorMessages={[ERRORES.requerido]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      style={{ color: 'black' }}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {tengoErrorEn.mandarError && (
          <Grid item xs={12} align="center">
            <Typography color="error">
              El DNI y/o contraseña ingresados son inválidos, por favor volvé a
              intentar.
            </Typography>
          </Grid>
        )}
      </Grid>

      <Grid container item xs={12} spacing={1} style={{ marginTop: 20 }}>
        <Grid item xs={6} align="right">
          <BotonGuardar texto="Iniciar sesión" loading={cargando} />
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="inherit" onClick={irARegistro}>
            Registrarse
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} align="center" style={{ marginTop: 20 }}>
        <Typography>
          <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
        </Typography>
      </Grid>
    </ValidatorForm>
  );
}
