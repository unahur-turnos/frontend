import {
  Grid,
  TextField,
  Typography,
  makeStyles,
  Box,
} from '@material-ui/core';

import { AYUDAS } from '../textos/Textos';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Autocomplete } from '@material-ui/lab';
import { PropTypes } from 'prop-types';
import { fechaHoraActividad } from '../../utils/dateUtils';
import { sort } from 'ramda';

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
  esAsistente,
  mostrarSiEstaDisponible = false,
}) {
  const classes = useStyles();

  const noHayCuposDisponibles = (aforo, turnos) => {
    return aforo - turnos === 0;
  };

  const sinCuposAlFinal = function (a, b) {
    return (
      (a.Espacio.aforo - a.turnos === 0) - (b.Espacio.aforo - b.turnos === 0) ||
      -((a.Espacio.aforo - a.turnos !== 0) > b.Espacio.aforo - b.turnos !== 0)
    );
  };

  const actividadesOrdenadas = sort(sinCuposAlFinal, actividades);

  return (
    <Autocomplete
      options={actividadesOrdenadas}
      getOptionLabel={(actividad) => actividad.nombre}
      className={classes.autocomplete}
      noOptionsText="No hay actividades que coincidan con la búsqueda"
      onChange={(event, actividad) => {
        funcionOnChange(actividad);
      }}
      getOptionDisabled={(actividad) =>
        esAsistente &&
        noHayCuposDisponibles(actividad.Espacio.aforo, actividad.turnos)
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Buscá una actividad"
          helperText={AYUDAS.selectorActividad}
        />
      )}
      renderOption={(actividad) => {
        return (
          <Grid container alignItems="center">
            <Grid item>
              <AssignmentIcon
                color={
                  esAsistente &&
                  noHayCuposDisponibles(
                    actividad.Espacio.aforo,
                    actividad.turnos
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
              <Typography variant="body2" color="textSecondary">
                {fechaHoraActividad(
                  actividad.fechaHoraInicio,
                  actividad.fechaHoraFin
                )}
              </Typography>
              {noHayCuposDisponibles(
                actividad.Espacio.aforo,
                actividad.turnos
              ) &&
                mostrarSiEstaDisponible && (
                  <Typography variant="body1">
                    <Box color="warning.main">NO HAY CUPOS DISPONIBLES</Box>
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
  esAsistente: PropTypes.bool,
  mostrarSiEstaDisponible: PropTypes.bool,
};
