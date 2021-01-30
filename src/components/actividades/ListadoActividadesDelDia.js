import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';

import AssignmentIcon from '@material-ui/icons/Assignment';
import { Autocomplete } from '@material-ui/lab';
import { DateTime } from 'luxon';
import { actividadesDelDia } from '../../state/actividades';
import { hourFormatter } from '../../utils/dateUtils';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 16,
  },
  autocomplete: {
    width: 400,
  },
  icon: {
    marginRight: 16,
  },
  card: {
    maxWidth: 275,
    borderRadius: 20,
    borderColor: theme.palette.primary.main,
  },
}));

export default function ListadoActividadesDelDia() {
  const classes = useStyles();

  const fechaActual = DateTime.local().toISODate();
  const actividades = useRecoilValue(actividadesDelDia(fechaActual));

  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

  return (
    <>
      <Grid container className={classes.container} spacing={4}>
        <Grid item xs={12} align="Center">
          <Typography variant="h4" color="primary">
            Actividades del día
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <Autocomplete
            id="actividades"
            options={actividades}
            getOptionLabel={(actividad) => actividad.nombre}
            className={classes.autocomplete}
            noOptionsText="No hay actividades que coincidan con la búsqueda"
            onChange={(event, actividad) => {
              setActividadSeleccionada(actividad);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Seleccione una actividad"
                variant="outlined"
              />
            )}
            renderOption={(actividad) => {
              return (
                <Grid container alignItems="center">
                  <Grid item>
                    <AssignmentIcon color="primary" className={classes.icon} />
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

        <Grid item xs={12} align="center">
          {actividadSeleccionada ? (
            <Card className={classes.card} variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  {actividadSeleccionada.nombre}
                </Typography>
                <Typography variant="body1">
                  {actividadSeleccionada.Espacio.nombre}
                </Typography>
                <Typography variant="body1">
                  Horario:{' '}
                  {hourFormatter(actividadSeleccionada.fechaHoraInicio)}
                  {' a '}
                  {hourFormatter(actividadSeleccionada.fechaHoraFin)}
                </Typography>
                <Typography variant="body1">
                  Responsable: {actividadSeleccionada.responsable}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </>
  );
}
