import {
  Button,
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
  Box,
} from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { autorizacionesUsuarioState } from '../../state/usuario';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { filter } from 'ramda';
import TarjetaTurno from '../ui/TarjetaTurno';
import AcordionTurno from '../ui/AcordionTurno';
import Alert from '@material-ui/lab/Alert';

export default function MisActividades() {
  const autorizaciones = useRecoilValue(autorizacionesUsuarioState);
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down('xs'));

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
        {matches && (
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              component={Link}
              to={`/autorizaciones/nueva`}
              startIcon={<PostAddIcon />}
            >
              Pedir turno
            </Button>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Próximas actividades</Typography>
        </Grid>
        {!matches && (
          <Grid item className={classes.floatRight}>
            <Button
              size={'medium'}
              variant="contained"
              color="primary"
              component={Link}
              to={`/autorizaciones/nueva`}
              startIcon={<PostAddIcon />}
            >
              Pedir turno
            </Button>
          </Grid>
        )}

        <Grid container spacing={2}>
          {autorizacionesFuturas().map((autorizacion) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={autorizacion.id}>
                <TarjetaTurno autorizacion={autorizacion} mostrarBoton={true} />
              </Grid>
            );
          })}
          {autorizacionesFuturas().length === 0 && (
            <Grid item className={classes.root}>
              <Alert severity="info">
                Aún no tenés ningún turno. Podés pedir uno haciendo{' '}
                <Link to="/autorizaciones/nueva">clic aquí.</Link>
              </Alert>
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
}));
