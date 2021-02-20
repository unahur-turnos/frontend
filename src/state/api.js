import { buildPath } from '../utils/queryUtils';
import { contadorActualizacionesState } from './actualizaciones';
import { getData } from '../utils/fetchApi';
import { selectorFamily } from 'recoil';
import { usuarioState } from './usuario';

export const apiIndex = selectorFamily({
  key: 'apiIndex',
  get: ({ path, filtro }) => ({ get }) => {
    get(contadorActualizacionesState(path));
    return getData(buildPath(path, filtro), get(usuarioState));
  },
});

export const apiById = selectorFamily({
  key: 'apiById',
  get: ({ path, id }) => ({ get }) => {
    get(contadorActualizacionesState(path));
    return getData(`${path}/${id}`, get(usuarioState));
  },
});
