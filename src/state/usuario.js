import { has } from 'ramda';
import { atom, selector } from 'recoil';
import { localStorageEffect } from './effect';

export const usuarioState = atom({
  key: 'usuario',
  default: {},
  effects_UNSTABLE: [localStorageEffect('usuario_actual')],
});

// TODO: modificar este selector cuando la autorización dependa del rol
export const estaAutorizadoState = selector({
  key: 'estaAutorizado',
  get: ({ get }) => has('token', get(usuarioState)),
});

// TODO: modificar este selector cuando la ruta dependa del rol
export const rutaInicialUsuarioState = selector({
  key: 'rutaInicialUsuario',
  get: () => '/actividades',
});
