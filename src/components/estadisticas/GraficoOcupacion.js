import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from 'victory';
import { PropTypes } from 'prop-types';
import { useTheme } from '@material-ui/core';

export function GraficoOcupacion({ datosAforo, datosTurnos }) {
  const { palette } = useTheme();

  return (
    <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
      <VictoryAxis />
      <VictoryAxis dependentAxis />
      <VictoryStack colorScale={[palette.primary.dark, palette.primary.main]}>
        <VictoryBar data={datosAforo} x="fecha" y="total" />
        <VictoryBar data={datosTurnos} x="fecha" y="total" />
      </VictoryStack>
    </VictoryChart>
  );
}

GraficoOcupacion.propTypes = {
  datosAforo: PropTypes.array,
  datosTurnos: PropTypes.array,
};
