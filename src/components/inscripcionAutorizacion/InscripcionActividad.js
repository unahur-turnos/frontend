import {
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';

import Paso1DDJJ from './Paso1DDJJ';
import Paso2DDJJ from './Paso2DDJJ';
import Paso3DDJJ from './Paso3DDJJ';
import { makeStyles } from '@material-ui/core/styles';
import { useApi } from '../../utils/fetchApi';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { usuarioState } from '../../state/usuario';

const pasos = [
  'Seleccioná la actividad',
  'Completá la declaración jurada',
  'Confirmá los datos',
];

export default function Actividad() {
  const history = useHistory();
  const classes = useStyles();
  const { create } = useApi('autorizaciones');
  const usuario = useRecoilValue(usuarioState);

  const [numeroPaso, setNumeroPaso] = useState(0);

  const [informacionSeleccionada, setInformacionSeleccionada] = useState(
    ESTADOINICIAL
  );

  function getComponenteDelPaso(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Paso1DDJJ
            handleChange={handleChange}
            agregarActividad={agregarActividad}
          />
        );
      case 1:
        return <Paso2DDJJ handleChange={handleChange} />;
      case 2:
        return <Paso3DDJJ informacionSeleccionada={informacionSeleccionada} />;
      default:
        return 'Paso desconocido';
    }
  }

  const handleChange = (e) => {
    setInformacionSeleccionada({
      ...informacionSeleccionada,
      [e.target.name]: e.target.value,
    });
  };

  const agregarActividad = (actividad) => {
    setInformacionSeleccionada({
      ...informacionSeleccionada,
      actividad: actividad,
    });
  };

  const siguientePaso = () => {
    setNumeroPaso(numeroPaso + 1);
  };

  const pasoAnterior = () => {
    setNumeroPaso(numeroPaso - 1);
  };

  const guardarInscripcion = async () => {
    await create({
      actividadId: informacionSeleccionada.actividad.id,
      estuvoEnContacto: informacionSeleccionada.estuvoEnContacto,
      usuarioId: usuario.id,
    });

    history.push('/autorizaciones/confirmacion');
  };

  return (
    <>
      <Box mt={3} display="flex" justifyContent="center">
        <Typography variant="h4" color="primary">
          Solicitar autorización
        </Typography>
      </Box>

      <Grid item xs={12} align="center">
        <Stepper
          activeStep={numeroPaso}
          alternativeLabel
          style={{
            backgroundColor: '#fafafa',
            maxWidth: '600px',
            marginTop: '20px',
          }}
        >
          {pasos.map((paso) => (
            <Step key={paso}>
              <StepLabel>{paso}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      {getComponenteDelPaso(numeroPaso)}

      <Grid align="center" className={classes.marginBotonYTexto}>
        <Button onClick={pasoAnterior} disabled={numeroPaso === 0}>
          Volver
        </Button>
        {numeroPaso === 2 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={guardarInscripcion}
          >
            Guardar
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={siguientePaso}
            disabled={informacionSeleccionada.actividad ? false : true}
          >
            Siguiente
          </Button>
        )}
      </Grid>
    </>
  );
}

const useStyles = makeStyles({
  marginBotonYTexto: {
    marginTop: '50px',
  },
});

const ESTADOINICIAL = {
  medioDeTransporte: 'Auto',
  personaDeRiesgo: false,
  estuvoEnContacto: false,
  autorizacionCuidar: false,
  capacitacionUNAHUR: false,
};
