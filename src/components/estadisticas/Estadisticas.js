import { Grid } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { estadisticasState } from '../../state/estadisticas';
import { GraficoOcupacion } from './GraficoOcupacion';

export default function Estadisticas() {
  const {
    ocupacion: { aforo, turnos },
  } = useRecoilValue(estadisticasState);

  return (
    <Grid container alignItems="center" spacing={3}>
      <Grid item xs={6}>
        <GraficoOcupacion datosAforo={aforo} datosTurnos={turnos} />
      </Grid>
    </Grid>
  );
}
