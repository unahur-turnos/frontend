import { has } from 'ramda';
import { atom, selector, selectorFamily } from 'recoil';
import { localStorageEffect } from './effect';
import SportsIcon from '@material-ui/icons/Sports';

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

export const menuNavegacionState = selector({
  key: 'menuNavegacion',
  get: ({ get }) => {
    return listaRutas.filter((ruta) =>
      get(tieneRolState(ruta.rolesPermitidos))
    );
  },
});

const listaRutas = [
  {
    nombre: 'Actividades',
    ruta: '/actividades',
    rolesPermitidos: ['admin'],
    icono: <SportsIcon />,
  },
  {
    nombre: 'Espacios',
    ruta: '/espacios',
    rolesPermitidos: ['admin'],
    icono: <SportsIcon />,
  },
  {
    nombre: 'Autorización',
    ruta: '/autorizaciones/nueva',
    rolesPermitidos: ['asistente'],
    icono: <SportsIcon />,
  },
  {
    nombre: 'Control de acceso',
    ruta: '/actividades/hoy',
    rolesPermitidos: ['bedel'],
    icono: <SportsIcon />,
  },
];
