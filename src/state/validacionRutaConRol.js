import { selectorFamily } from 'recoil';
import { usuarioState } from './usuario';

export const tieneRolState = selectorFamily({
  key: 'tieneRol',
  get: (rolesPermitidos) => ({ get }) => {
    return rolesPermitidos.includes(get(usuarioState)?.rol);
  },
});
