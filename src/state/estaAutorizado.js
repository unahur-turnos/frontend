import { selector } from 'recoil';
import usuario from './login';

const estaAutorizado = selector({
  key: 'estaAutorizado',
  get: ({ get }) => get(usuario).token !== undefined,
});

export default estaAutorizado;
