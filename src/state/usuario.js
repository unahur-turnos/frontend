import { has } from 'ramda';
import { atom, selector, selectorFamily } from 'recoil';
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
  get: ({ get }) =>
    get(usuarioState).rol === 'admin'
      ? '/actividades'
      : '/autorizaciones/nueva',
});

export const tieneRolState = selectorFamily({
  key: 'tieneRol',
  get: (rolesPermitidos) => ({ get }) => {
    return rolesPermitidos.includes(get(usuarioState)?.rol);
  },
});

export const listaRutasQueCumpleState = selectorFamily({
  key: 'listaRutasQueCumple',
  get: () => ({ get }) => {
    return listaRutas.filter((ruta) =>
      get(tieneRolState(ruta.rolesPermitidos))
    );
  },
});

const listaRutas = [
  { nombre: 'Actividades', ruta: '/actividades', rolesPermitidos: ['admin'] },
  { nombre: 'Espacios', ruta: '/espacios', rolesPermitidos: ['admin'] },
  {
    nombre: 'Autorización',
    ruta: '/autorizacion/nueva',
    rolesPermitidos: ['asistente'],
  },
  {
    nombre: 'Control de acceso',
    ruta: '/actividades/hoy',
    rolesPermitidos: ['bedel'],
  },
];
