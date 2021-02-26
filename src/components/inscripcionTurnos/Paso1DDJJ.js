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
import { actividadesUsuario } from '../../state/usuario';
import { useRecoilValue } from 'recoil';
import { DateTime } from 'luxon';

export default function Paso1DDJJ({ handleChange, agregarActividad }) {
  const fechaActual = DateTime.local().toISODate();
  const actividades = useRecoilValue(
    actividadesUsuario({ desde: fechaActual })
  );
  const cambioDeActividad = (nombre, actividad) => {
    agregarActividad(nombre, actividad);
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} align="center">
          <SelectorActividad
            actividades={actividades}
            funcionOnChange={cambioDeActividad}
            esAsistente={true}
            mostrarSiEstaDisponible={true}
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
