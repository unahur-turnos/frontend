import { atom } from 'recoil';

const informacionUsuarioState = atom({
  key: 'informacionUsuarioState',
  default: { dni: '', contrasenia: '' },
});

export default informacionUsuarioState;
