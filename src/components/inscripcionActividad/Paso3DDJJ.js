import { Box, Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function Paso3DDJJ({ informacionSeleccionada }) {
  const matches = useMediaQuery('(min-width:600px)');

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
          <Typography variant="h6">Nombre y apellido:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">Florencia Massey</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Número de documento:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">12312332</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Actividad seleccionada:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">
            {informacionSeleccionada.actividadSeleccionada}
          </Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Horario seleccionado:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">Medio de transporte</Typography>
        </Grid>
      </Grid>
    </>
  );
}

Paso3DDJJ.propTypes = {
  informacionSeleccionada: PropTypes.object,
};
