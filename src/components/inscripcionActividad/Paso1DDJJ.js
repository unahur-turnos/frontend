import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';
import { getData } from '../../helpers/fetchApi';
import { useRecoilValue } from 'recoil';
import { actividadPorId, todasLasActividades } from '../../state/actividades';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import moment from 'moment';

export default function Paso1DDJJ({ handleChange, agregarUnValor }) {
  const matches = useMediaQuery('(min-width:600px)');

  const actividadesDB = useRecoilValue(
    todasLasActividades({
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImRuaSI6MTExMTIyMjIsImlhdCI6MTYxMTY5Njk2NSwiZXhwIjoxNjI3MjQ4OTY1fQ.eEttlDmeTCybNuQqTLXUum_FsmGC_QmEXdSQj3wCaIU',
      },
    })
  );

  const [actividades, setActividades] = useState(actividadesDB.data);

  const cambioDeActividad = (nombre, actividad) => {
    agregarUnValor(nombre, actividad);
  };

  return (
    <>
      <Box mt={8} display="flex" justifyContent="center">
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
        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Seleccione actividad:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <FormControl style={{ minWidth: 250 }}>
            <Autocomplete //NO SE NOS OCURRIÓ UNA FORMA MEJOR PARA ESTO
              options={actividades}
              onChange={(event, newValue) => {
                cambioDeActividad('actividad', newValue);
              }}
              getOptionLabel={(actividad) => {
                const horaInicio = moment(actividad.fechaHoraInicio).format(
                  'DD/MM'
                );
                const minutosInicio = moment(actividad.fechaHoraInicio).format(
                  'HH:mm'
                );
                const minutosFinal = moment(actividad.fechaHoraFin).format(
                  'HH:mm'
                );
                return `${
                  actividad.nombre
                } ${'\n'}${horaInicio} de ${minutosInicio} a ${minutosFinal}`; // No estaría andando el salto de linea
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

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Medio de transporte</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
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

const useStyles = makeStyles({
  marginTopCampos: {
    marginTop: '25px',
  },
});

Paso1DDJJ.propTypes = {
  handleChange: PropTypes.func,
  setInformacionSeleccionada: PropTypes.func,
  agregarUnValor: PropTypes.func,
};
