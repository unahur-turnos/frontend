import {
  Card,
  Typography,
  Grid,
  CardContent,
  Box,
  InputAdornment,
  Button,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { ERRORES } from '../textos/Textos';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { BotonGuardar } from '../ui/BotonGuardar';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useInputStyles } from '../../utils/numberFieldWithoutArrows';

export default function RecuperarContrasenia() {
  const [iconoCargando, setIconoCargando] = useState(false);
  const [dni, setDNI] = useState();
  const history = useHistory();
  const inputClasses = useInputStyles();

  const mandarMail = () => {
    setIconoCargando(true);
  };

  const handleChange = (e) => {
    setDNI(e.target.value);
  };

  const volverAlLogin = () => {
    history.push('/login');
  };

  return (
    <>
      <Box mt={5} display="flex" justifyContent="center">
        <Typography variant="h4" color="primary">
          Recuperar contraseña
        </Typography>
      </Box>
      <ValidatorForm onSubmit={mandarMail}>
        <Grid container spacing={4} align="center">
          <Grid item xs={12}>
            <Grid item xs={9} sm={7} md={4} style={{ marginTop: 20 }}>
              <Alert severity="info" align="left">
                <AlertTitle>¿Olvidaste tu contraseña?</AlertTitle>
                <br />
                <Typography variant="body2">
                  Para recibir tu código de acceso por correo electrónico,
                  ingresá tu DNI
                </Typography>
              </Alert>
              <Grid item xs={12} style={{ marginTop: 20 }}>
                <TextValidator
                  id="dni"
                  label="Ingresá tu documento"
                  onChange={handleChange}
                  name="dni"
                  type="number"
                  className={inputClasses.numberFieldWithoutArrows}
                  fullWidth
                  value={dni}
                  validators={[
                    'required',
                    'minNumber:1000000',
                    'maxNumber:99999999',
                  ]}
                  errorMessages={[ERRORES.requerido, ERRORES.dni, ERRORES.dni]}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <AssignmentIndIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid container style={{ marginTop: 20 }}>
                <Grid item xs={6} align="left">
                  <Button onClick={volverAlLogin}>Volver al login</Button>
                </Grid>
                <Grid item xs={6} align="right">
                  <BotonGuardar loading={iconoCargando} texto="Mandar mail" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}
