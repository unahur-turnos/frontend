import { BotonGuardar } from './BotonGuardar';

export default {
  title: 'UI/BotonGuardar',
  component: BotonGuardar,
};

const Template = (args) => <BotonGuardar {...args} />;

export const TextoPorDefecto = Template.bind({});

export const TextoDistinto = Template.bind({});
TextoDistinto.args = {
  texto: 'Aceptar',
};
