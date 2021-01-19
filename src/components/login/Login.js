import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from '@material-ui/core';

import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { create } from '../../helpers/fetchApi';

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

            <Grid item xs={6}>
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
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                style={{ minWidth: 250 }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mt={7} justifyContent="center" display="flex">
          <Button
            variant="contained"
            color="primary"
            component={Link}
            onClick={validarLogin}
          >
            Iniciar sesión
          </Button>
          <Button component={Link} to="/registro">
            Registrarse
          </Button>
        </Box>
      </Box>
    </>
  );
}
