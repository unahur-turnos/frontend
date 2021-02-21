import { Grid, Typography, Box } from '@material-ui/core';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Alert, AlertTitle } from '@material-ui/lab';

const AlertMessage = () => {
  return (
    <Grid item xs={12} sm={6} align="left">
      <Alert severity="warning" style={{ marginBottom: '4vh' }}>
        <AlertTitle>¡Atención!</AlertTitle>
        Recordá que para poder asistir vas a tener que completar la capacitación
        en el siguiente{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://campus.unahur.edu.ar/course/view.php?id=2834"
        >
          enlace
        </a>
        .
        <br />
        Al ingresar a la Universidad validaremos que hayas completado la
        capacitación.
      </Alert>
    </Grid>
  );
};

export default function Paso3DDJJ({ informacionSeleccionada }) {
  const matches = useMediaQuery('(min-width:600px)');
  const { actividad, capacitacionUNAHUR } = informacionSeleccionada;

  return (
    <>
      <Grid container component={Box} justifyContent="center">
        {capacitacionUNAHUR === 'false' && <AlertMessage />}
      </Grid>

      <Grid container alignItems="flex-end" spacing={4}>
        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Nombre de la actividad:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">{actividad.nombre}</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Fecha y hora de inicio:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">
            {DateTime.fromISO(actividad.fechaHoraInicio)
              .setLocale('es')
              .toFormat('dd/MM HH:mm')}
          </Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Fecha y hora final:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">
            {DateTime.fromISO(actividad.fechaHoraFin)
              .setLocale('es')
              .toFormat('dd/MM HH:mm')}
          </Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Nombre del espacio:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">
            {actividad.Espacio.nombre}
          </Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Nombre del edificio:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">
            {actividad.Espacio.Edificio.nombre}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

Paso3DDJJ.propTypes = {
  informacionSeleccionada: PropTypes.object,
};
