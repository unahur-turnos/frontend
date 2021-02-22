import {
  Button,
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
  Box,
} from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import AddIcon from '@material-ui/icons/Add';
import { autorizacionesUsuarioState } from '../../state/usuario';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { filter } from 'ramda';
import TarjetaTurno from '../ui/TarjetaTurno';
import AcordionTurno from '../ui/AcordionTurno';

export default function MisActividades() {
  const autorizaciones = useRecoilValue(autorizacionesUsuarioState);
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:380px)');

  const autorizacionesFuturas = () => {
    return filter(
      (autorizacion) =>
        DateTime.fromISO(autorizacion.Actividad.fechaHoraInicio) >
        DateTime.local(),
      autorizaciones
    );
  };

  const autorizacionesPasadas = () => {
    return filter(
      (autorizacion) =>
        DateTime.fromISO(autorizacion.Actividad.fechaHoraInicio) <
        DateTime.local(),
      autorizaciones
    );
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" color="primary">
            Mis turnos
          </Typography>
        </Grid>
        <Grid item xs={5} sm={6}>
          <Typography variant="h6">Próximas actividades</Typography>
        </Grid>
        <Grid item className={classes.floatRight}>
          <Button
            size={matches ? 'medium' : 'small'}
            variant="contained"
            color="primary"
            component={Link}
            to={`/autorizaciones/nueva`}
            startIcon={<AddIcon />}
          >
            Nuevo turno
          </Button>
        </Grid>

        <Grid container spacing={2}>
          {autorizacionesFuturas().map((autorizacion) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={autorizacion.id}>
                <TarjetaTurno autorizacion={autorizacion} mostrarBoton={true} />
              </Grid>
            );
          })}
          {autorizacionesFuturas().length === 0 && (
            <Grid item>
              <Grid item xs={12} className={classes.tarjetaMarginLeft}>
                <Typography>No hay próximo turnos</Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid component={Box} container mt={2}>
          <AcordionTurno data={autorizacionesPasadas()} />
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles(() => ({
  floatRight: {
    marginLeft: 'auto',
  },
  tarjetaMarginLeft: {
    marginLeft: 16,
  },
}));
