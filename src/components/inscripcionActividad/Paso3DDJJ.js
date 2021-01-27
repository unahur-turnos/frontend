import { Box, Grid, Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { espacioPorId } from '../../state/espacios';

export default function Paso3DDJJ({ informacionSeleccionada }) {
  const matches = useMediaQuery('(min-width:600px)');
  const espacio = useRecoilValue(
    espacioPorId(informacionSeleccionada.actividad.Espacio.id)
  ).data;

  return (
    <>
      <Box mt={12} align="center">
        <Typography variant="h4" color="primary">
          Confirmación
        </Typography>
      </Box>
      <Grid
        container
        alignItems="flex-end"
        spacing={4}
        style={{ marginTop: '8px' }}
      >
        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Nombre de la actividad:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">
            {informacionSeleccionada.actividad.nombre}
          </Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Fecha y hora de inicio:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">
            {moment(informacionSeleccionada.actividad.fechaHoraInicio).format(
              'DD/MM HH:mm'
            )}
          </Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Fecha y hora final:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">
            {moment(informacionSeleccionada.actividad.fechaHoraFin).format(
              'DD/MM HH:mm'
            )}
          </Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Nombre del espacio:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">
            {informacionSeleccionada.actividad.Espacio.nombre}
          </Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Nombre del edificio:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">{espacio.Edificio.nombre}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

Paso3DDJJ.propTypes = {
  informacionSeleccionada: PropTypes.object,
};
