import {
  Button,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Box,
} from '@material-ui/core';

import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { create } from '../../helpers/fetchApi';
import { useSetRecoilState } from 'recoil';
import informacionUsuarioState from '../../state/login';

export default function Registro() {
  const history = useHistory();

  const setInfoUsuario = useSetRecoilState(informacionUsuarioState);

  const [user, setUser] = useState('');
  const [tengoErrorEn, setTengoErrorEn] = useState({
    nombre: false,
    apellido: false,
    dni: false,
    email: false,
    telefono: false,
    contraseña: false,
    global: false,
  });
  const emailRegex = new RegExp('/S+@S+.S+/');

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log(user);
  };

  const validarRegistro = async () => {
    sleep(3000);

    create('/usuarios/registro', user)
      .then((res) => {
        console.log(res);
        setInfoUsuario(res.token);
        history.push('/');
      })
      .catch((err) => {
        setTengoErrorEn({ ...tengoErrorEn, global: true });
        console.log(err);
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
              value={user.nombre}
              onChange={handleChange}
              style={{ minWidth: 250 }}
              validators={['required']}
              errorMessages={['Este campo es requerido', ERRORES.nombre]}
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
              value={user.apellido}
              validators={['required']}
              errorMessages={['Este campo es requerido', ERRORES.apellido]}
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
              value={user.dni}
              validators={['required', 'matchRegexp:^[0-9]{7,8}$']}
              errorMessages={['Este campo es requerido', ERRORES.dni]}
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
              validations={{ matchRegexp: emailRegex }}
              id="emailUsuario"
              label="Ingrese una correo electrónico"
              name="email"
              onChange={handleChange}
              value={user.email}
              validators={['required', 'isEmail']}
              errorMessages={['Este campo es requerido', ERRORES.email]}
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
              value={user.telefono}
              validators={['required']}
              errorMessages={['Este campo es requerido', ERRORES.telefono]}
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
              value={user.contrasenia}
              validators={['required', 'minStringLength:5']}
              errorMessages={['Este campo es requerido', ERRORES.contraseña]}
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
              id="constraeñaConfirmacion"
              label="Confirme la contraseña"
              name="constraeñaConfirmacion"
              type="password"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['Este campo es requerido', ERRORES.contraseña]}
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
                Puede que tu nombre de usuario o contraseña sean incorrectos
              </Typography>
            </Grid>
          )}

          <Grid container item xs={12} spacing={1}>
            <Grid item xs={6} align="right">
              <Button variant="contained" color="primary" type="submit">
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const ERRORES = {
  nombre: 'Ingrese su nombre.',
  apellido: 'Ingrese su apellido.',
  email: 'Ingrese un email válido.',
  telefono: 'Ingrese un número válido',
  contraseña: 'Ingrese una contraseña válida',
};
