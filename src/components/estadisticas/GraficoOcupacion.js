import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTooltip,
} from 'victory';
import { PropTypes } from 'prop-types';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@material-ui/core';

export function GraficoOcupacion({ datosAforo, datosTurnos }) {
  const { palette } = useTheme();

  // Pequeño truquito para que la barra de turnos parezca "contenida" dentro de la de aforo.
  const diferenciaConAforo = (datum) =>
    datum.total - datosTurnos[datosAforo.indexOf(datum)]?.total;

  return (
    <Card>
      <CardContent>
        <Grid container justify="center">
          <Typography variant="h5" color="textSecondary">
            Ocupación total por día
          </Typography>
          <VictoryChart domainPadding={50}>
            <VictoryAxis />
            <VictoryAxis dependentAxis />
            <VictoryStack
              colorScale={[palette.primary.dark, palette.primary.main]}
            >
              <VictoryBar
                data={datosTurnos}
                x="fecha"
                y="total"
                labels={({ datum }) => `Turnos: ${datum.total}`}
                labelComponent={<VictoryTooltip />}
              />
              <VictoryBar
                data={datosAforo}
                x="fecha"
                y={diferenciaConAforo}
                labels={({ datum }) => `Aforo: ${datum.total}`}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryStack>
          </VictoryChart>
        </Grid>
      </CardContent>
    </Card>
  );
}

GraficoOcupacion.propTypes = {
  datosAforo: PropTypes.array,
  datosTurnos: PropTypes.array,
};
