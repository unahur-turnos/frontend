import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import { todasLasActividades } from '../../state/actividades';
import { useRecoilValue } from 'recoil';
import { AYUDAS } from '../textos/Textos';

export default function Paso1DDJJ({ handleChange, agregarUnValor }) {
  const actividades = useRecoilValue(todasLasActividades());

  const cambioDeActividad = (nombre, actividad) => {
    agregarUnValor(nombre, actividad);
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} align={'center'}>
          <FormControl style={{ minWidth: 300 }}>
            <Autocomplete
              options={actividades}
              noOptionsText={'No se encuentra'}
              onChange={(event, newValue) => {
                cambioDeActividad('actividad', newValue);
              }}
              getOptionDisabled={(actividad) =>
                actividad.Espacio.aforo - actividad.autorizaciones === 0
              }
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
                  style={{ maxWidth: 300 }}
                  helperText={AYUDAS.autorizacionSelectorActividades}
                  {...params}
                  label="Buscá una actividad"
                  margin="normal"
                />
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} align={'center'}>
          <FormControl style={{ minWidth: 300 }}>
            <InputLabel id="medioDeTransporte">
              Elegí tu medio de transporte
            </InputLabel>
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
            <FormHelperText style={{ maxWidth: 300 }}>
              {AYUDAS.autorizacionSelectorTransporte}
            </FormHelperText>
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
