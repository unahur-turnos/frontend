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
import { turnosUsuarioState } from '../../state/usuario';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { filter } from 'ramda';
import TarjetaTurno from '../ui/TarjetaTurno';
import AcordionTurno from '../ui/AcordionTurno';
import Alert from '@material-ui/lab/Alert';

export default function MisActividades() {
  const turnos = useRecoilValue(turnosUsuarioState);
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  const turnosFuturos = () => {
    return filter(
      (turno) =>
        DateTime.fromISO(turno.Actividad.fechaHoraInicio) > DateTime.local(),
      turnos
    );
  };

  const turnosPasados = () => {
    return filter(
      (turno) =>
        DateTime.fromISO(turno.Actividad.fechaHoraInicio) < DateTime.local(),
      turnos
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
              to={`/turnos/nuevo`}
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
              to={`/turnos/nuevo`}
              startIcon={<PostAddIcon />}
            >
              Pedir turno
            </Button>
          </Grid>
        )}

        <Grid container spacing={2}>
          {turnosFuturos().map((turno) => {
            {
              return !matches ? (
                <Grid item xs={11} sm={6} md={4} key={turno.id}>
                  <TarjetaTurno turno={turno} mostrarBoton={true} />
                </Grid>
              ) : (
                <Grid
                  container
                  component={Box}
                  display="flex"
                  justifyContent="center"
                  margin={1}
                  key={turno.id}
                >
                  <Grid item xs={11}>
                    <TarjetaTurno turno={turno} mostrarBoton={true} />
                  </Grid>
                </Grid>
              );
            }
          })}
          {turnosFuturos().length === 0 && (
            <Grid item className={classes.root}>
              <Alert
                severity="info"
                style={{ marginLeft: 10, marginBottom: 10 }}
              >
                Aún no tenés ningún turno. Podés pedir uno haciendo{' '}
                <Link to="/turnos/nuevo">clic aquí.</Link>
              </Alert>
            </Grid>
          )}
        </Grid>
        <Grid component={Box} container mt={2}>
          <AcordionTurno data={turnosPasados()} />
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
