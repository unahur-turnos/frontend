import { GraficoOcupacion } from './GraficoOcupacion';

export default {
  title: 'Estadísticas/GraficoOcupacion',
  component: GraficoOcupacion,
};

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

const Template = (args) => (
  <GraficoOcupacion
    datosAforo={datosAforo}
    datosTurnos={datosTurnos}
    {...args}
  />
);

export const Defecto = Template.bind({});
