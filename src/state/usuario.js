import { has } from 'ramda';
import { atom, selector } from 'recoil';

export const usuarioState = atom({
  key: 'usuario',
  default: { dni: '', contrasenia: '' },
});

// TODO: modificar este selector cuando la autorización dependa del rol
export const estaAutorizadoState = selector({
  key: 'estaAutorizado',
  get: ({ get }) => has('token', get(usuarioState)),
});

// TODO: modificar este selector cuando la ruta dependa del rol
export const rutaInicialUsuarioState = selector({
  key: 'rutaInicialUsuario',
  get: ({ get }) =>
    get(usuarioState).rol === 'admin' ? '/actividades' : '/actividades/nueva',
});
