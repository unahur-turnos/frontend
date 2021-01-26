import {
  Button,
  Grid,
  Typography,
  InputAdornment,
  Box,
  CircularProgress,
} from '@material-ui/core';

import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useApi } from '../../helpers/fetchApi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import { rutaInicialUsuarioState, usuarioState } from '../../state/usuario';
import ERRORES from '../ErroresText/Errores';

export default function Registro() {
  const history = useHistory();
  const classes = useStyles();
  const { create } = useApi('usuarios/registro');
  ValidatorForm.addValidationRule(
    'isPasswordMatch',
    (value) => value === informacionDelUsuario.contrasenia
  );

  const setUsuario = useSetRecoilState(usuarioState);
  const rutaInicialUsuario = useRecoilValue(rutaInicialUsuarioState);

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
      .then((res) => {
        setUsuario(res);
        history.push(rutaInicialUsuario);
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
        <Box mt={8} display="flex" justifyContent="center">
          <Typography variant="h4" color="primary">
            Registrarse
          </Typography>
        </Box>

        <Grid
          container
          alignItems="flex-end"
          spacing={4}
          style={{ marginTop: '8px' }}
        >
          <Grid item xs={6} align="right">
            <Typography variant="h6">Nombre/s:</Typography>
          </Grid>

          <Grid item xs={6}>
            <TextValidator
              id="nombreUsuario"
              label="Ingrese su nombre/s"
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

          <Grid item xs={6} align="right">
            <Typography variant="h6">Apellido/s:</Typography>
          </Grid>

          <Grid item xs={6}>
            <TextValidator
              id="apellidoUsuario"
              label="Ingrese su apellido/s"
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

          <Grid item xs={6} align="right">
            <Typography variant="h6">DNI:</Typography>
          </Grid>

          <Grid item xs={6}>
            <TextValidator
              id="dniUsuario"
              label="Ingrese su DNI"
              name="dni"
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
              style={{ minWidth: 250 }}
            />
          </Grid>

          <Grid item xs={6} align="right">
            <Typography variant="h6">Correo electrónico:</Typography>
          </Grid>

          <Grid item xs={6}>
            <TextValidator
              id="emailUsuario"
              label="Ingrese una correo electrónico"
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

          <Grid item xs={6} align="right">
            <Typography variant="h6">Número de celular:</Typography>
          </Grid>

          <Grid item xs={6}>
            <TextValidator
              id="telefono"
              label="Número de celular"
              name="telefono"
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
              style={{ minWidth: 250 }}
            />
          </Grid>

          <Grid item xs={6} align="right">
            <Typography variant="h6">Contraseña:</Typography>
          </Grid>

          <Grid item xs={6}>
            <TextValidator
              id="contraseniaUsuario"
              label="Ingrese una contraseña"
              name="contrasenia"
              type="password"
              onChange={handleChange}
              value={informacionDelUsuario.contrasenia}
              validators={['required', 'minStringLength:6']}
              errorMessages={[ERRORES.requerido, ERRORES.contrasenia]}
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

          <Grid item xs={6} align="right">
            <Typography variant="h6">Confirmar contraseña:</Typography>
          </Grid>

          <Grid item xs={6}>
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
}));
