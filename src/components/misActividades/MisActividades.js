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
import { todasLasAutorizacionesState } from '../../state/usuario';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { filter } from 'ramda';
import Tarjeta from '../ui/Tarjeta';
import Acordion from '../ui/Acordion';

export default function MisActividades() {
  const autorizaciones = useRecoilValue(todasLasAutorizacionesState);
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
        <Grid item xs={6}>
          <Typography variant="h6">Próximos turnos</Typography>
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
                <Tarjeta autorizacion={autorizacion} mostrarBoton={true} />
              </Grid>
            );
          })}
          {autorizacionesFuturas().length === 0 && (
            <Grid item xs={12}>
              <Typography>No hay futuros turnos</Typography>
            </Grid>
          )}
        </Grid>
        <Grid component={Box} container mt={2}>
          {<Acordion data={autorizacionesPasadas()} />}
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles(() => ({
  floatRight: {
    marginLeft: 'auto',
  },
}));
