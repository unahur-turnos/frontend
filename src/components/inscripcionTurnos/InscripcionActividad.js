import {
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { path } from 'ramda';
import Paso1DDJJ from './Paso1DDJJ';
import Paso2DDJJ from './Paso2DDJJ';
import Paso3DDJJ from './Paso3DDJJ';
import { useApi } from '../../utils/fetchApi';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { usuarioState } from '../../state/usuario';
import { useNotificarActualizacion } from '../../state/actualizaciones';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { BotonGuardar } from '../ui/BotonGuardar';
import { Alert } from '@material-ui/lab';

const pasos = [
  'Seleccioná la actividad',
  'Completá la declaración jurada',
  'Confirmá los datos',
];

export default function Actividad() {
  const history = useHistory();
  const { create } = useApi('turnos');
  const usuario = useRecoilValue(usuarioState);
  const [iconoCargando, setIconoCargando] = useState(false);
  const [errorAlPedirTurno, setErrorAlPedirTurno] = useState({
    hayError: false,
    mensaje: '',
  });

  const [numeroPaso, setNumeroPaso] = useState(0);
  const notificarActualizacionTurno = useNotificarActualizacion(
    'usuarios/yo/turnos'
  );

  const notificarActualizacionActividades = useNotificarActualizacion(
    'usuarios/yo/actividades'
  );

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
        return (
          <Paso2DDJJ
            handleChange={handleChange}
            informacionSeleccionada={informacionSeleccionada}
          />
        );
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
    setIconoCargando(true);
    try {
      await create({
        actividadId: informacionSeleccionada.actividad.id,
        medioDeTransporte: informacionSeleccionada.medioDeTransporte,
        usuarioId: usuario.id,
      });
      notificarActualizacionTurno();
      notificarActualizacionActividades();
      history.push('/turnos/confirmacion');
    } catch (error) {
      if (path(['response', 'status'], error) === 422) {
        setErrorAlPedirTurno({
          hayError: true,
          mensaje: error.response.data.error,
        });
      }
    }
  };

  const irAMisTurnos = () => {
    history.push('/turnos');
  };

  return (
    <>
      <Box mt={3} display="flex" justifyContent="center">
        <Typography variant="h4" color="primary">
          Solicitar turno
        </Typography>
      </Box>
      <ValidatorForm onSubmit={guardarInscripcion}>
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

        <Grid container spacing={10} align="center">
          <Grid item xs={12}>
            <Grid item xs={9} sm={7} md={4} style={{ marginTop: 20 }}>
              {numeroPaso === 0 ? (
                <Button onClick={irAMisTurnos}>Cancelar</Button>
              ) : (
                !errorAlPedirTurno.hayError && (
                  <Button onClick={pasoAnterior}>Volver</Button>
                )
              )}
              {numeroPaso === 2 && !errorAlPedirTurno.hayError && (
                <BotonGuardar loading={iconoCargando} />
              )}
              {numeroPaso !== 2 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={siguientePaso}
                  disabled={informacionSeleccionada.actividad ? false : true}
                >
                  Siguiente
                </Button>
              )}
              {errorAlPedirTurno.hayError && (
                <div>
                  <Alert severity="error" align="left">
                    {errorAlPedirTurno.mensaje}
                  </Alert>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={irAMisTurnos}
                    style={{ marginTop: 20 }}
                  >
                    Volver al inicio
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}

const ESTADOINICIAL = {
  medioDeTransporte: 'Movilidad propia',
  completoCapacitacion: false,
};
