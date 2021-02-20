import { contadorActualizacionesState } from './actualizaciones';
import { getData } from '../utils/fetchApi';
import { selectorFamily } from 'recoil';
import { split } from 'ramda';
import { usuarioState } from './usuario';

export const apiIndex = selectorFamily({
  key: 'apiIndex',
  get: (path) => ({ get }) => {
    const nombreEntidad = split('?', path)[0];
    get(contadorActualizacionesState(nombreEntidad));
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
