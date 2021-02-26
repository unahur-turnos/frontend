import { atom, selector, selectorFamily } from 'recoil';

import ApartmentIcon from '@material-ui/icons/Apartment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import { apiIndex } from './api';
import { has } from 'ramda';
import { localStorageEffect } from './effect';

const listaRutas = [
  {
    nombre: 'Mis turnos',
    ruta: '/turnos',
    rolesPermitidos: ['asistente'],
    icono: <LocalActivityIcon />,
  },
  {
    nombre: 'Actividades',
    ruta: '/actividades',
    rolesPermitidos: ['admin'],
    icono: <LocalActivityIcon />,
  },
  {
    nombre: 'Espacios',
    ruta: '/espacios',
    rolesPermitidos: ['admin'],
    icono: <ApartmentIcon />,
  },
  {
    nombre: 'Solicitar turno',
    ruta: '/turnos/nuevo',
    rolesPermitidos: ['asistente'],
    icono: <ListAltIcon />,
  },
  {
    nombre: 'Control de turnos',
    ruta: '/actividades/hoy',
    rolesPermitidos: ['bedel'],
    icono: <AssignmentTurnedInIcon />,
  },
];

export const usuarioState = atom({
  key: 'usuario',
  default: {},
  effects_UNSTABLE: [localStorageEffect('usuario_actual')],
});

export const hayUsuarioLogueadoState = selector({
  key: 'hayUsuarioLogueado',
  get: ({ get }) => has('token', get(usuarioState)),
});

export const tieneRolState = selectorFamily({
  key: 'tieneRol',
  get: (rolesPermitidos) => ({ get }) => {
    return rolesPermitidos.includes(get(usuarioState)?.rol);
  },
});

export const turnosUsuarioState = selector({
  key: 'turnosUsuario',
  get: async ({ get }) => {
    const { data } = get(apiIndex({ path: 'usuarios/yo/turnos' }));
    return data;
  },
});

export const menuNavegacionState = selector({
  key: 'menuNavegacion',
  get: ({ get }) => {
    return listaRutas.filter((ruta) =>
      get(tieneRolState(ruta.rolesPermitidos))
    );
  },
});

export const rutaInicialUsuarioState = selector({
  key: 'rutaInicialUsuario',
  get: ({ get }) => rutaInicialUsuario(get(usuarioState)),
});

export function rutaInicialUsuario(usuario) {
  switch (usuario.rol) {
    case 'asistente':
      return '/turnos';
    case 'bedel':
      return '/actividades/hoy';
    case 'admin':
      return '/actividades';
    default:
      return '/';
  }
}

export const actividadesUsuario = selectorFamily({
  key: 'actividadesUsuario',
  get: (filtro) => async ({ get }) => {
    const { data } = get(apiIndex({ path: 'usuarios/yo/actividades', filtro }));
    return data;
  },
});
