import { selectorFamily } from 'recoil';
import { getData } from '../utils/fetchApi';
import { contadorActualizacionesState } from './actualizaciones';
import { usuarioState } from './usuario';

export const apiIndex = selectorFamily({
  key: 'apiIndex',
  get: (path) => ({ get }) => {
    get(contadorActualizacionesState(path));
    return getData(path, get(usuarioState));
  },
});

export const apiById = selectorFamily({
  key: 'apiById',
  get: ({ path, id }) => ({ get }) => {
    get(contadorActualizacionesState(path));
    return getData(`${path}/${id}`, get(usuarioState));
  },
});
