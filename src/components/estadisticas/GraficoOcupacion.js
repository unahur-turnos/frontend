import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack } from 'victory';
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
              <VictoryBar data={datosAforo} x="fecha" y="total" />
              <VictoryBar data={datosTurnos} x="fecha" y="total" />
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
