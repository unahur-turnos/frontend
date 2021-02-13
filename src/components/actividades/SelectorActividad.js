import { Grid, TextField, Typography, makeStyles } from '@material-ui/core';

import { AYUDAS } from '../textos/Textos';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Autocomplete } from '@material-ui/lab';
import { PropTypes } from 'prop-types';
import { fechaHoraActividad } from '../../utils/dateUtils';

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: 330,
  },
  icon: {
    marginRight: 16,
  },
}));

export default function SelectorActividad({
  actividades,
  funcionOnChange,
  deshabilitarSinCupo,
  agregarHorario,
  agregarInfo,
}) {
  const classes = useStyles();

  const noHayCuposDisponibles = (aforo, autorizaciones) => {
    return aforo - autorizaciones === 0;
  };

  return (
    <Autocomplete
      options={actividades}
      getOptionLabel={(actividad) => actividad.nombre}
      className={classes.autocomplete}
      noOptionsText="No hay actividades que coincidan con la búsqueda"
      onChange={(event, actividad) => {
        if (agregarInfo) {
          funcionOnChange('actividad', actividad);
        } else {
          funcionOnChange(actividad);
        }
      }}
      getOptionDisabled={(actividad) =>
        deshabilitarSinCupo &&
        noHayCuposDisponibles(actividad.Espacio.aforo, actividad.autorizaciones)
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Buscá una actividad"
          helperText={AYUDAS.autorizacionSelectorActividades}
        />
      )}
      renderOption={(actividad) => {
        return (
          <Grid container alignItems="center">
            <Grid item>
              <AssignmentIcon
                color={
                  deshabilitarSinCupo &&
                  noHayCuposDisponibles(
                    actividad.Espacio.aforo,
                    actividad.autorizaciones
                  )
                    ? 'secondary'
                    : 'primary'
                }
                className={classes.icon}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="body1" style={{ fontWeight: 700 }}>
                {actividad.nombre}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {`${actividad.Espacio.nombre} - ${actividad.Espacio.Edificio.nombre}`}
              </Typography>
              {agregarHorario && (
                <Typography variant="body2" color="textSecondary">
                  {fechaHoraActividad(
                    actividad.fechaHoraInicio,
                    actividad.fechaHoraFin
                  )}
                </Typography>
              )}
            </Grid>
          </Grid>
        );
      }}
    />
  );
}

SelectorActividad.propTypes = {
  actividades: PropTypes.arrayOf(PropTypes.object),
  funcionOnChange: PropTypes.func,
  deshabilitarSinCupo: PropTypes.bool,
  agregarHorario: PropTypes.bool,
  agregarInfo: PropTypes.bool,
};
