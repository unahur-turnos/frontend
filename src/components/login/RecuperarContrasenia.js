import {
  Typography,
  Grid,
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
import { PropTypes } from 'prop-types';
import { useApi } from '../../utils/fetchApi';

export default function RecuperarContrasenia() {
  const [iconoCargando, setIconoCargando] = useState(false);
  const [noSeEncontroDNI, setNoSeEncontroDNI] = useState(false);
  const { create } = useApi('usuarios/recuperar', null);
  const history = useHistory();
  const [dni, setDNI] = useState();
  const [pasoNumero, setPasoNumero] = useState(1);

  const handleChangeStep = async () => {
    try {
      setNoSeEncontroDNI(false);
      setIconoCargando(true);
      await create({ dni: dni });
      setPasoNumero(2);
    } catch (error) {
      setNoSeEncontroDNI(true);
    } finally {
      setIconoCargando(false);
    }
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
      <ValidatorForm onSubmit={handleChangeStep} instantValidate={false}>
        <Grid container spacing={4} align="center">
          <Grid item xs={12}>
            <Grid item xs={9} sm={7} md={4} style={{ marginTop: 20 }}>
              {pasoNumero === 1 && <MandarMail dni={dni} setDNI={setDNI} />}
              {pasoNumero === 2 && (
                <Alert severity="warning" align="left">
                  <Typography variant="body2">
                    Hemos enviado un enlace a su correo electrónico para que
                    pueda reestablecer su contraseña.
                  </Typography>
                </Alert>
              )}
              {noSeEncontroDNI && (
                <Grid style={{ marginTop: 20 }}>
                  <Typography color="error">
                    No se encontró un DNI registrado.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 20 }}>
          <Grid
            item
            xs={pasoNumero === 1 ? 6 : 12}
            align={pasoNumero === 1 ? 'right' : 'center'}
          >
            <Button onClick={volverAlLogin}>Volver al login</Button>
          </Grid>
          <Grid item xs={6}>
            {pasoNumero === 1 && (
              <BotonGuardar loading={iconoCargando} texto="Recuperar" />
            )}
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}

function MandarMail({ dni, setDNI }) {
  const inputClasses = useInputStyles();

  const handleChange = (e) => {
    setDNI(e.target.value);
  };

  return (
    <>
      <Alert severity="info" align="left">
        <AlertTitle>¿Olvidaste tu contraseña?</AlertTitle>
        <br />
        <Typography variant="body2">
          Para recibir tu código de acceso por correo electrónico, ingresá tu
          DNI
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
          validators={['required', 'minNumber:1000000', 'maxNumber:99999999']}
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
    </>
  );
}

MandarMail.propTypes = {
  dni: PropTypes.number,
  setDNI: PropTypes.func,
};
