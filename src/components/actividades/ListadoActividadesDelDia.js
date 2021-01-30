import { Box, Grid, TextField, Typography } from '@material-ui/core';

import AssignmentIcon from '@material-ui/icons/Assignment';
import { Autocomplete } from '@material-ui/lab';
import { DateTime } from 'luxon';
import { actividadesDelDia } from '../../state/actividades';
import { useRecoilValue } from 'recoil';

export default function ListadoActividadesDelDia() {
  const fechaActual = DateTime.local().toISODate();
  const actividades = useRecoilValue(actividadesDelDia(fechaActual));

  return (
    <>
      <Box mt={5}>
        <Typography variant="h4" color="primary">
          Actividades del día
        </Typography>
      </Box>

      <Grid container style={{ marginTop: '16px' }}>
        <Grid item xs={12} align="center">
          <Autocomplete
            id="actividades"
            options={actividades}
            getOptionLabel={(actividad) => actividad.nombre}
            style={{ width: 400 }}
            noOptionsText="No hay actividades que coincidan con la búsqueda"
            renderInput={(params) => (
              <TextField {...params} label="Actividades" variant="outlined" />
            )}
            renderOption={(actividad) => {
              return (
                <Grid container alignItems="center">
                  <Grid item>
                    <AssignmentIcon
                      color="primary"
                      style={{ marginRight: '16px' }}
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" style={{ fontWeight: 700 }}>
                      {actividad.nombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {actividad.Espacio.nombre}
                    </Typography>
                  </Grid>
                </Grid>
              );
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
