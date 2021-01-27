import { atom, selector } from 'recoil';

export const usuarioState = atom({
  key: 'usuario',
  default: { dni: '', contrasenia: '' },
});

export const estaAutorizadoState = selector({
  key: 'estaAutorizado',
  get: ({ get }) => get(usuarioState).token !== undefined,
});
