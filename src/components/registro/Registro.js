import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';

export default function Login() {
  const [user, setUser] = useState('');
  const emailRegex = new RegExp('/S+@S+.S+/');

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  return (
    <>
      <Box mt={8}>
        <Typography variant="h4" color="primary">
          Registrarse
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" mt={2}>
        <Box>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="flex-end"
            spacing={3}
          >
            <Grid item xs={6}>
              <Typography variant="h6">Nombre/s:</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="documento"
                label="Ingrese su nombre/s"
                name="documento"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
                style={{ minWidth: 250 }}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Apellido/s:</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="apellidoUsuario"
                label="Ingrese su apellido/s"
                name="constraenia"
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
          </Grid>
        </Box>
        <Box mt={7} justifyContent="center" display="flex">
          <Button variant="contained" color="primary" component={Link} to="/">
            Guardar
          </Button>
          <Button component={Link} to="/">
            Cancelar
          </Button>
        </Box>
      </Box>
    </>
  );
}
