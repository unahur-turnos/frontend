import { apiIndex } from './api';
import { selector, selectorFamily } from 'recoil';

export const autorizacionesPorActividad = selectorFamily({
  key: 'autorizacionesPorActividad',
  get: (id) => async ({ get }) => {
    const { data } = get(apiIndex(`actividades/${id}/autorizaciones`));
    return data;
  },
});
