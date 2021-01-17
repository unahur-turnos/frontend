import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from '@material-ui/core';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

export default function Login() {
  const dniRegex = new RegExp('^[0-9]{8}$');
  const [showPassword, setshowPassword] = useState(false);
  const [values, setValues] = useState({
    documento: '',
    contraseña: '',
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
                id="documento"
                label="Ingrese su documento"
                name="documento"
                onChange={handleChange}
                validations={{ matchRegexp: dniRegex }}
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
              <Typography variant="h6">Contraseña:</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="contraseña"
                label="Ingrese una contraseña"
                name="constraseña"
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
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
          <Button variant="contained" color="primary" component={Link} to="/">
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
