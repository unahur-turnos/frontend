import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import { todasLasActividades } from '../../state/actividades';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useRecoilValue } from 'recoil';

export default function Paso1DDJJ({ handleChange, agregarUnValor }) {
  const matches = useMediaQuery('(min-width:600px)');

  const actividades = useRecoilValue(todasLasActividades(null));

  const cambioDeActividad = (nombre, actividad) => {
    agregarUnValor(nombre, actividad);
  };

  return (
    <>
      <Box mt={5} display="flex" justifyContent="center">
        <Typography variant="h4" color="primary">
          Solicitud de una actividad
        </Typography>
      </Box>
      <Grid
        container
        alignItems="flex-end"
        spacing={4}
        style={{ marginTop: '8px' }}
      >
        <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Seleccione actividad:</Typography>
        </Grid>

        <Grid item xs={12} sm={6} align={!matches && 'center'}>
          <FormControl style={{ minWidth: 250 }}>
            <Autocomplete
              options={actividades}
              noOptionsText={'No se encuentra'}
              onChange={(event, newValue) => {
                cambioDeActividad('actividad', newValue);
              }}
              getOptionLabel={(actividad) => {
                const timeStart = DateTime.fromISO(actividad.fechaHoraInicio)
                  .setLocale('es')
                  .toFormat("cccc dd 'de' T 'a'");
                const timeFinal = DateTime.fromISO(actividad.fechaHoraFin)
                  .setLocale('es')
                  .toFormat('T');

                return `${actividad.nombre} ${timeStart} ${timeFinal}`;
              }}
              id="actividadId"
              name="actividadId"
              blurOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Actividades disponibles:"
                  margin="normal"
                />
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Medio de transporte</Typography>
        </Grid>

        <Grid item xs={12} sm={6} align={!matches && 'center'}>
          <FormControl style={{ minWidth: 250 }}>
            <InputLabel id="medioDeTransporte">Elija un transporte</InputLabel>
            <Select
              labelId="medioDeTransporte"
              name="medioDeTransporte"
              onChange={handleChange}
              defaultValue={'Auto'}
            >
              <MenuItem value={'Auto'}>Auto</MenuItem>
              <MenuItem value={'TransportePublico'}>
                Transporte público
              </MenuItem>
              <MenuItem value={'Bicicleta'}>Caminando/Bici</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

Paso1DDJJ.propTypes = {
  handleChange: PropTypes.func,
  agregarUnValor: PropTypes.func,
};
