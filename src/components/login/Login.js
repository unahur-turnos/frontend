import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { create } from '../../helpers/fetchApi';
import { useState } from 'react';

export default function Login() {
  const dniRegex = new RegExp('^[0-9]{8}$');
  const history = useHistory();
  const [showPassword, setshowPassword] = useState(false);
  const [values, setValues] = useState({
    dni: '',
    contrasenia: '',
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const validarLogin = () => {
    create('/usuarios/login', ...values);
    history.push('/');
  };

  return (
    <>
      <Box mt={8}>
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
          <TextField
            id="dni"
            label="Ingrese su documento"
            name="dni"
            onChange={handleChange}
            validations={{ matchRegexp: dniRegex }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <AssignmentIndIcon />
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
            id="contrasenia"
            label="Ingrese una contraseña"
            name="contrasenia"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
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
            style={{ minWidth: 250 }}
          />
        </Grid>

        <Grid container item xs={12} spacing={1}>
          <Grid item xs={6} align="right">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              onClick={validarLogin}
            >
              Iniciar sesión
            </Button>
          </Grid>
          <Grid item xs={6} align="left">
            <Button
              variant="contained"
              color="inherit"
              component={Link}
              to="/registro"
            >
              Registrarse
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
