import {
  Button,
  Grid,
  Typography,
  InputAdornment,
  Box,
  CircularProgress,
  useMediaQuery,
} from '@material-ui/core';

import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useApi } from '../../utils/fetchApi';
import { useSetRecoilState } from 'recoil';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import { rutaInicialUsuario, usuarioState } from '../../state/usuario';
import { ERRORES } from '../textos/Textos';

export default function Registro() {
  const matches = useMediaQuery('(min-width:600px)');
  const history = useHistory();
  const classes = useStyles();
  const { create } = useApi('usuarios/registro');

  ValidatorForm.addValidationRule(
    'isPasswordMatch',
    (value) => value === informacionDelUsuario.contrasenia
  );

  ValidatorForm.addValidationRule('contraseñaValida', (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(String(value))
  );

  const setUsuario = useSetRecoilState(usuarioState);

  const [informacionDelUsuario, setInformacionDelUsuario] = useState({
    contrasenia: '',
    confirmarContraseña: '',
  });
  const [iconoCargando, setIconoCargando] = useState(false);
  const [tengoErrorEn, setTengoErrorEn] = useState({
    nombre: false,
    apellido: false,
    dni: false,
    email: false,
    telefono: false,
    contraseña: false,
    global: false,
  });

  const handleChange = (e) => {
    setInformacionDelUsuario({
      ...informacionDelUsuario,
      [e.target.name]: e.target.value,
    });
  };

  const validarRegistro = async () => {
    setIconoCargando(true);
    setTengoErrorEn({ ...tengoErrorEn, global: false });

    create(informacionDelUsuario)
      .then((usuario) => {
        setUsuario(usuario);
        history.push(rutaInicialUsuario(usuario));
      })
      .catch((err) => {
        ERRORES.mensajeDeError = err.response.data.error;
        setIconoCargando(false);
        setTengoErrorEn({ ...tengoErrorEn, global: true });
      });
  };

  return (
    <>
      <ValidatorForm onSubmit={validarRegistro} instantValidate={false}>
        <Box mt={5} display="flex" justifyContent="center">
          <Typography variant="h4" color="primary">
            Registrarse
          </Typography>
        </Box>

        <Grid
          container
          alignItems="flex-end"
          spacing={matches ? 4 : 2}
          style={{ marginTop: '8px' }}
        >
          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">Nombre/s:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextValidator
              id="nombreUsuario"
              label="Ingresá tu nombre/s"
              name="nombre"
              value={informacionDelUsuario.nombre}
              onChange={handleChange}
              style={{ minWidth: 250 }}
              validators={['required']}
              errorMessages={[ERRORES.requerido, ERRORES.nombre]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">Apellido/s:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextValidator
              id="apellidoUsuario"
              label="Ingresá tu apellido/s"
              name="apellido"
              onChange={handleChange}
              value={informacionDelUsuario.apellido}
              validators={['required']}
              errorMessages={[ERRORES.requerido, ERRORES.apellido]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              style={{ minWidth: 250 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">DNI:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextValidator
              id="dniUsuario"
              label="Ingresá tu DNI"
              name="dni"
              type="number"
              className={classes.numberTextField}
              onChange={handleChange}
              value={informacionDelUsuario.dni}
              validators={[
                'required',
                'minNumber:1000000',
                'maxNumber:99999999',
              ]}
              errorMessages={[ERRORES.requerido, ERRORES.dni, ERRORES.dni]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AssignmentIndIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">Correo electrónico:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextValidator
              id="emailUsuario"
              label="Ingresá un correo electrónico"
              name="email"
              onChange={handleChange}
              value={informacionDelUsuario.email}
              validators={['required', 'isEmail']}
              errorMessages={[ERRORES.requerido, ERRORES.email]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              style={{ minWidth: 250 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">Número de celular:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextValidator
              id="telefono"
              label="Número de celular"
              name="telefono"
              type="number"
              onChange={handleChange}
              value={informacionDelUsuario.telefono}
              validators={['required']}
              errorMessages={[ERRORES.requerido, ERRORES.telefono]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneEnabledIcon />
                  </InputAdornment>
                ),
              }}
              className={classes.numberTextField}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            align={matches ? 'right' : 'center'}
            component={Box}
            alignSelf="center"
          >
            <Typography variant="h6">Contraseña:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextValidator
              id="contraseniaUsuario"
              label="Ingresá una contraseña"
              name="contrasenia"
              type="password"
              helperText="Mínimo 8 caracteres, con minúsculas, mayúsculas y números"
              onChange={handleChange}
              value={informacionDelUsuario.contrasenia}
              validators={['required', 'contraseñaValida']}
              errorMessages={[ERRORES.requerido, ERRORES.contrasenia]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              style={{ maxWidth: 250, minWidth: 249 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">Confirmar contraseña:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextValidator
              id="confirmarContraseña"
              label="Confirme la contraseña"
              name="confirmarContraseña"
              type="password"
              onChange={handleChange}
              value={informacionDelUsuario.confirmarContraseña}
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
              style={{ minWidth: 250 }}
            />
          </Grid>

          {tengoErrorEn.global && (
            <Grid item xs={12} align="center">
              <Typography color="secondary">
                {ERRORES.mensajeDeError}
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
                Guardar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button component={Link} to="/">
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}

const useStyles = makeStyles(() => ({
  loading: {
    marginRight: '10px',
  },
  numberTextField: {
    minWidth: 250,
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none',
    },
  },
}));
