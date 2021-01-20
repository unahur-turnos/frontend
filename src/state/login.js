import { atomFamily } from 'recoil';

const informacionUsuarioState = atomFamily({
  key: 'informacionUsuarioState',
  default: { dni: '', contrasenia: '' },
});

export default informacionUsuarioState;
