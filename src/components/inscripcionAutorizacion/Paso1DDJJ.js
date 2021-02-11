import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import { todasLasActividades } from '../../state/actividades';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useRecoilValue } from 'recoil';
import HelpIcon from '@material-ui/icons/Help';
import { AYUDAS } from '../textos/Textos';
import theme from '../../theme';

export default function Paso1DDJJ({ handleChange, agregarUnValor }) {
  const matches = useMediaQuery('(min-width:800px)');
  const { it } = theme.breakpoints.values;
  const actividades = useRecoilValue(todasLasActividades());

  const cambioDeActividad = (nombre, actividad) => {
    agregarUnValor(nombre, actividad);
  };

  return (
    <>
      <Grid container alignItems="flex-end" spacing={4}>
        <Grid item xs={12} it={6} md={6} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Seleccioná actividad:</Typography>
        </Grid>

        <Grid item xs={12} it={6} align={!matches && 'center'}>
          <FormControl style={{ minWidth: 250 }}>
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
                  {...params}
                  label="Actividades disponibles:"
                  margin="normal"
                />
              )}
            />
          </FormControl>
          {
            <ToolTipButton
              mensaje={AYUDAS.autorizacionSelectorActividades}
              margen={25}
            />
          }
        </Grid>

        <Grid item xs={12} it={6} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Medio de transporte:</Typography>
        </Grid>

        <Grid item xs={12} it={6} align={!matches && 'center'}>
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
          {
            <ToolTipButton
              mensaje={AYUDAS.autorizacionSelectorTransporte}
              margen={8}
            />
          }
        </Grid>
      </Grid>
    </>
  );
}

function ToolTipButton({ mensaje, margen }) {
  return (
    <>
      <Tooltip title={mensaje} placement="top">
        <IconButton style={{ marginTop: margen }}>
          <HelpIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

Paso1DDJJ.propTypes = {
  handleChange: PropTypes.func,
  agregarUnValor: PropTypes.func,
};

ToolTipButton.propTypes = {
  mensaje: PropTypes.string,
  margen: PropTypes.integer,
};
