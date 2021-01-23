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
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { create } from '../../helpers/fetchApi';

export default function Login() {
  const history = useHistory();

  const [user, setUser] = useState('');
  const emailRegex = new RegExp('/S+@S+.S+/');

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const validarRegistro = () => {
    try {
      create('/usuarios/registro', user);
      history.push('/login');
    } catch (err) {
      console.log(err);
      //setTengoErrorEn({ ...tengoErrorEn, mandarError: true }); Sacar de el login
    }
  };

  return (
    <>
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
          <ValidatorForm instantValidate={false}>
            <TextValidator
              required
              label="Ingrese su nombre/s"
              name="documento"
              onChange={handleChange}
              style={{ minWidth: 250 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
            />
          </ValidatorForm>
        </Grid>

        <Grid item xs={6} align="right">
          <Typography variant="h6">Apellido/s:</Typography>
        </Grid>

        <Grid item xs={6}>
          <TextField
            required
            id="apellidoUsuario"
            label="Ingrese su apellido/s"
            name="apellidoUsuario"
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
          <TextField
            id="dniUsuario"
            label="Ingrese su DNI"
            name="dni"
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
          <TextField
            validations={{ matchRegexp: emailRegex }}
            id="emailUsuario"
            label="Ingrese una correo electrónico"
            name="email"
            type="email"
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
          <Typography variant="h6">Contraseña:</Typography>
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="contraseniaUsuario"
            label="Ingrese una contraseña"
            name="constraeniaUsuario"
            type="password"
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
          <TextField
            id="constraeñaConfirmacion"
            label="Confirme la contraseña"
            name="constraeñaConfirmacion"
            type="password"
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

        <Grid container item xs={12} spacing={1}>
          <Grid item xs={6} align="right">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              onClick={validarRegistro}
            >
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
    </>
  );
}
