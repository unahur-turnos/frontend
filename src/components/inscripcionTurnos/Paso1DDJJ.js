import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

import { Box } from '@material-ui/core';
import { AYUDAS } from '../textos/Textos';
import { PropTypes } from 'prop-types';
import SelectorActividad from '../actividades/SelectorActividad';
import { actividadesUsuario } from '../../state/usuario';
import { useRecoilValue } from 'recoil';
import { DateTime } from 'luxon';
import { filter } from 'ramda';
import { Alert, AlertTitle } from '@material-ui/lab';

const AlertMessage = () => {
  return (
    <Grid item xs={12} sm={6} align="left">
      <Alert severity="info" style={{ marginBottom: '4vh' }}>
        <AlertTitle>¡Atención!</AlertTitle>
        Podés sacar un máximos de 2 turnos por día. Lo verificaremos en los
        siguientes pasos.
      </Alert>
    </Grid>
  );
};

export default function Paso1DDJJ({ handleChange, agregarActividad }) {
  const actividades = useRecoilValue(actividadesUsuario());
  const cambioDeActividad = (nombre, actividad) => {
    agregarActividad(nombre, actividad);
  };

  const actividadesFiltradas = () => {
    return filter(
      (actividad) =>
        DateTime.fromISO(actividad.fechaHoraInicio) > DateTime.local(),
      actividades
    );
  };
  return (
    <>
      <Grid container component={Box} justifyContent="center">
        <AlertMessage />
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} align="center">
          <SelectorActividad
            actividades={actividadesFiltradas()}
            funcionOnChange={cambioDeActividad}
            esAsistente={true}
          />
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            <InputLabel id="medioDeTransporte">
              Seleccioná tu medio de transporte
            </InputLabel>
            <Select
              labelId="medioDeTransporte"
              name="medioDeTransporte"
              onChange={handleChange}
              defaultValue={'Auto'}
              align="left"
            >
              <MenuItem value={'Auto'}>Movilidad propia</MenuItem>
              <MenuItem value={'TransportePublico'}>
                Transporte público
              </MenuItem>
              <MenuItem value={'Caminando'}>Caminando</MenuItem>
            </Select>
            <FormHelperText style={{ maxWidth: 330 }}>
              {AYUDAS.selectorTransporte}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

Paso1DDJJ.propTypes = {
  handleChange: PropTypes.func,
  agregarActividad: PropTypes.func,
};
