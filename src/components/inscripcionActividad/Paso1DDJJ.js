import {
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
const actividades = [
  {
    id: 1,
    nombre: 'Clase de laboratorio',
    fechaHoraInicio: '2021-01-24T16:41:32.892Z',
    fechaHoraFin: '2021-01-24T16:41:32.892Z',
    responsable: 'Pablito Gerez',
    dniResponsable: 18765234,
    tipoResponsable: 'Docente',
    estado: true,
    requiereControl: false,
    createdAt: '2021-01-26T21:37:26.604Z',
    updatedAt: '2021-01-26T21:37:26.604Z',
    espacioId: 1,
    cuposDisponibles: 10,
    Espacio: {
      id: 1,
      nombre: 'Playon',
      Edificio: {
        id: 1,
        nombre: 'Origone B',
      },
    },
  },
  {
    id: 2,
    nombre: 'Clase de matematica',
    fechaHoraInicio: '2020-11-24T16:41:32.892Z',
    fechaHoraFin: '2022-12-24T16:41:32.892Z',
    responsable: 'Ashe asheeeee',
    dniResponsable: 1231432,
    tipoResponsable: 'Docente',
    estado: true,
    requiereControl: false,
    createdAt: '2021-01-26T21:38:13.719Z',
    updatedAt: '2021-01-26T21:38:13.719Z',
    espacioId: 2,
    cuposDisponibles: 2,
    Espacio: {
      id: 2,
      nombre: 'Biblioteca',
      Edificio: {
        id: 2,
        nombre: 'Origone A',
      },
    },
  },
];

export default function Paso1DDJJ({ handleChange, agregarUnValor }) {
  const matches = useMediaQuery('(min-width:600px)');

  //const actividades = useRecoilValue(todasLasActividades());

  const cambioDeActividad = (nombre, actividad) => {
    agregarUnValor(nombre, actividad);
  };

  return (
    <>
      <Grid container alignItems="flex-end" spacing={4}>
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
              getOptionDisabled={(actividad) =>
                actividad.cuposDisponibles === 0
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
