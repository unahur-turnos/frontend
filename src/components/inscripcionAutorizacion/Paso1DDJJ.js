import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

import { AYUDAS } from '../textos/Textos';
import { PropTypes } from 'prop-types';
import SelectorActividad from '../actividades/SelectorActividad';
import { todasLasActividades } from '../../state/actividades';
import { useRecoilValue } from 'recoil';

export default function Paso1DDJJ({ handleChange, agregarActividad }) {
  const actividades = useRecoilValue(todasLasActividades());

  const cambioDeActividad = (actividad) => {
    agregarActividad(actividad);
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} align="center">
          <SelectorActividad
            actividades={actividades}
            funcionOnChange={cambioDeActividad}
            deshabilitarSinCupo={true}
            agregarHorario={true}
          />
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            <InputLabel id="medioDeTransporte">
              Elegí tu medio de transporte
            </InputLabel>
            <Select
              labelId="medioDeTransporte"
              name="medioDeTransporte"
              onChange={handleChange}
              defaultValue={'Auto'}
              align="left"
            >
              <MenuItem value={'Auto'}>Auto</MenuItem>
              <MenuItem value={'TransportePublico'}>
                Transporte público
              </MenuItem>
              <MenuItem value={'Bicicleta'}>Caminando/Bici</MenuItem>
            </Select>
            <FormHelperText style={{ maxWidth: 330 }}>
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
  agregarActividad: PropTypes.func,
};
