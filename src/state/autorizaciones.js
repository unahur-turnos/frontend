import { getData } from '../utils/fetchApi';
import { selectorFamily } from 'recoil';
import { usuarioState } from './usuario';

export const autorizacionesPorActividad = selectorFamily({
  key: 'autorizacionesPorActividad',
  get: (id) => async ({ get }) => {
    const { data } = await getData(
      `actividades/${id}/autorizaciones`,
      get(usuarioState)
    );
    return data;
  },
});
