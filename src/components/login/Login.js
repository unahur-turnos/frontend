import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { create } from '../../helpers/fetchApi';
import { useSetRecoilState } from 'recoil';
import informacionUsuarioState from '../../state/login';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';

export default function Login() {
  const history = useHistory();
  const classes = useStyles();

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

  const setInfoUsuario = useSetRecoilState(informacionUsuarioState);

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

    await sleep(3000);

    if (
      valoresEntrantes.dni.length === 0 ||
      tengoErrorEn.dni ||
      tengoErrorEn.contrasenia
    ) {
      //LA CONTRASEÑA NO TIENE VALIDACIÓN, NO ANDA je
      setTengoErrorEn({ ...tengoErrorEn, mandarError: true });
      setIconoCargando(false);
      return;
    }

    setIconoCargando(false);

    create('/usuarios/login', valoresEntrantes)
      .then((res) => {
        setInfoUsuario(res.token); //PARA CAMBIAR A VARIABLE COMUN
        history.push('/');
      })
      .catch((err) => {
        setTengoErrorEn({ ...tengoErrorEn, mandarError: true });
      });
  };

  //VALIDAR EL DNI QUE SEA DE 8 DIGITOS... SI NO, MARCA ERROR.
  const handleBlueLogin = (event) => {
    const {
      target: { value },
    } = event;
    //emailRef.current.validate(event.target.value); NO ANDA

    let regex = new RegExp(/^[0-9]{8}$/).test(value);

    if (!regex) {
      setTengoErrorEn({ ...tengoErrorEn, [event.target.name]: true });
      return;
    }
    setTengoErrorEn({ ...tengoErrorEn, dni: false });
  };

  return (
    <>
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
          <ValidatorForm instantValidate={false}>
            <TextValidator
              required
              label="Ingrese su documento"
              onBlur={handleBlueLogin}
              onChange={handleChange}
              name="dni"
              error={tengoErrorEn.dni}
              errorMessages={[ERRORES.dni, 'Insert a DNI GIL']}
              style={{ minWidth: 250 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AssignmentIndIcon />
                  </InputAdornment>
                ),
              }}
            />
          </ValidatorForm>
        </Grid>

        <Grid item xs={6} align="right">
          <Typography variant="h6">Contraseña:</Typography>
        </Grid>

        <Grid item xs={6}>
          <TextField
            required
            id="contrasenia"
            label="Ingrese una contraseña"
            name="contrasenia"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            style={{ minWidth: 250 }}
            error={tengoErrorEn.contrasenia}
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
              Puede que tu nombre de usuario o contraseña sean incorrectos
            </Typography>
          </Grid>
        )}

        <Grid container item xs={12} spacing={1}>
          <Grid item xs={6} align="right">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              onClick={validarLogin}
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
    </>
  );
}

/*
<TextField
            required
            id="dni"
            label="Ingrese su documento"
            name="dni"
            onChange={handleChange}
            validations={{ matchRegexp: '^[0-9]{8}$') }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <AssignmentIndIcon />
                </InputAdornment>
              ),
            }}
            style={{ minWidth: 250 }}
            error={textFieldState}
          />
*/

const ERRORES = {
  dni: 'Ingrese un DNI válido',
  contrasenia: 'Ingrese una contraseña válida',
};

const useStyles = makeStyles((theme) => ({
  loading: {
    marginRight: '10px',
  },
}));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
