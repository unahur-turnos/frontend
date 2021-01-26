import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useApi } from '../../helpers/fetchApi';
import { useSetRecoilState } from 'recoil';
import { usuarioState } from '../../state/usuario';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import ERRORES from '../ErroresText/Errores';

export default function Login() {
  const history = useHistory();
  const classes = useStyles();
  const { create } = useApi('usuarios/login');

  const [showPassword, setshowPassword] = useState(false);
  const [iconoCargando, setIconoCargando] = useState(false);
  const [tengoErrorEn, setTengoErrorEn] = useState({
    dni: false,
    contrasenia: false,
    mandarError: false,
  });

  const [valoresEntrantes, setValoresEntrantes] = useState({
    dni: '',
    contrasenia: '',
  });

  const setUsuario = useSetRecoilState(usuarioState);

  const handleChange = (e) => {
    setValoresEntrantes({
      ...valoresEntrantes,
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
    setIconoCargando(true);
    setTengoErrorEn({ ...tengoErrorEn, mandarError: false });
    setIconoCargando(false);

    create(valoresEntrantes)
      .then((usuario) => {
        setUsuario(usuario);
        history.push('/actividades');
      })

      .catch(() => {
        setTengoErrorEn({ ...tengoErrorEn, mandarError: true });
      });
  };

  return (
    <ValidatorForm onSubmit={validarLogin} instantValidate={false}>
      <Box mt={8} display="flex" justifyContent="center">
        <Typography variant="h4" color="primary">
          Iniciar sesión
        </Typography>
      </Box>

      <Grid
        container
        alignItems="flex-end"
        spacing={4}
        style={{ marginTop: '8px' }}
      >
        <Grid item xs={6} align="right">
          <Typography variant="h6">Número de documento:</Typography>
        </Grid>

        <Grid item xs={6}>
          <TextValidator
            id="dni"
            label="Ingrese su documento"
            onChange={handleChange}
            name="dni"
            type="number"
            value={valoresEntrantes.dni}
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

        <Grid item xs={6} align="right">
          <Typography variant="h6">Contraseña:</Typography>
        </Grid>

        <Grid item xs={6}>
          <TextValidator
            id="contrasenia"
            label="Ingrese una contraseña"
            name="contrasenia"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            style={{ minWidth: 250 }}
            value={valoresEntrantes.contrasenia}
            validators={['required', 'minStringLength:6']}
            errorMessages={[ERRORES.requerido, ERRORES.contrasenia]}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {tengoErrorEn.mandarError && (
          <Grid item xs={12} align="center">
            <Typography color="secondary">
              El DNI y/o contraseña ingresados son inválidos, por favor vuelva a
              intentar.
            </Typography>
          </Grid>
        )}

        <Grid container item xs={12} spacing={1}>
          <Grid item xs={6} align="right">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={iconoCargando}
            >
              {iconoCargando && (
                <CircularProgress
                  color="white"
                  className={classes.loading}
                  size={25}
                />
              )}
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

const useStyles = makeStyles(() => ({
  loading: {
    marginRight: '10px',
  },
}));
