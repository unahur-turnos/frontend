import { Grid } from '@material-ui/core';
import { GraficoOcupacion } from './GraficoOcupacion';

const datosAforo = [
  { fecha: 'mar 9/3', total: 80 },
  { fecha: 'mié 10/3', total: 80 },
  { fecha: 'jue 11/3', total: 80 },
  { fecha: 'vie 12/3', total: 90 },
];

const datosTurnos = [
  { fecha: 'mar 9/3', total: 15 },
  { fecha: 'mié 10/3', total: 8 },
  { fecha: 'jue 11/3', total: 50 },
  { fecha: 'vie 12/3', total: 90 },
];

export default function Estadisticas() {
  return (
    <Grid container alignItems="center" spacing={3}>
      <Grid item xs={6}>
        <GraficoOcupacion datosAforo={datosAforo} datosTurnos={datosTurnos} />
      </Grid>
    </Grid>
  );
}
