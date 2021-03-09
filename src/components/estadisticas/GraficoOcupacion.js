import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from 'victory';
import { PropTypes } from 'prop-types';

export function GraficoOcupacion({ datosAforo, datosTurnos }) {
  return (
    <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
      <VictoryAxis />
      <VictoryAxis dependentAxis />
      <VictoryStack>
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
