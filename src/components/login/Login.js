import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useApi } from '../../utils/fetchApi';
import { useSetRecoilState } from 'recoil';
import { usuarioState } from '../../state/usuario';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import ERRORES from '../ErroresText/Errores';
import rutaInicialusuario from '../autenticacion/rutaInicialusuario';

export default function Login() {
  const matches = useMediaQuery('(min-width:600px)');
  const history = useHistory();
  const { create } = useApi('usuarios/login');

  const [showPassword, setshowPassword] = useState(false);
  const [tengoErrorEn, setTengoErrorEn] = useState({
    dni: false,
    contrasenia: false,
    mandarError: false,
  });

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

  //VALIDAR LOGIN.
  const validarLogin = async () => {
    setTengoErrorEn({ ...tengoErrorEn, mandarError: false });

    create(valoresUsuario)
      .then((usuario) => {
        setUsuario(usuario);
        history.push(rutaInicialusuario(usuario));
      })

      .catch(() => {
        setTengoErrorEn({ ...tengoErrorEn, mandarError: true });
      });
  };

  return (
    <ValidatorForm onSubmit={validarLogin} instantValidate={false}>
      <Box mt={5} display="flex" justifyContent="center">
        <Typography variant="h4" color="primary">
          Iniciar sesión
        </Typography>
      </Box>

      <Grid
        container
        alignItems="flex-end"
        spacing={matches ? 4 : 2}
        style={{ marginTop: '8px' }}
      >
        <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Número de documento:</Typography>
        </Grid>

        <Grid item xs={12} sm={6} align={!matches && 'center'}>
          <TextValidator
            id="dni"
            label="Ingrese su documento"
            onChange={handleChange}
            name="dni"
            type="number"
            value={valoresUsuario.dni}
            validators={['required', 'minNumber:1000000', 'maxNumber:99999999']}
            errorMessages={[ERRORES.requerido, ERRORES.dni, ERRORES.dni]}
            style={{ minWidth: 250 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <AssignmentIndIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Contraseña:</Typography>
        </Grid>

        <Grid item xs={12} sm={6} align={!matches && 'center'}>
          <TextValidator
            id="contrasenia"
            label="Ingrese una contraseña"
            name="contrasenia"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            style={{ minWidth: 250 }}
            value={valoresUsuario.contrasenia}
            validators={['required', 'minStringLength:6']}
            errorMessages={[ERRORES.requerido, ERRORES.contrasenia]}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    style={{ color: 'black' }}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {tengoErrorEn.mandarError && (
          <Grid item xs={12} sm={6} align="center">
            <Typography color="secondary">
              El DNI y/o contraseña ingresados son inválidos, por favor vuelva a
              intentar.
            </Typography>
          </Grid>
        )}

        <Grid container item xs={12} spacing={1}>
          <Grid item xs={6} align="right">
            <Button variant="contained" color="primary" type="submit">
              Iniciar sesión
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="inherit"
              component={Link}
              onClick={irARegistro}
            >
              Registrarse
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
}
