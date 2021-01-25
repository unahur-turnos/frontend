import { atom } from 'recoil';

const usuario = atom({
  key: 'usuario',
  default: { dni: '', contrasenia: '' },
});

export default usuario;
