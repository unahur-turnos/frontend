import { apiIndex } from './api';
import { selectorFamily } from 'recoil';

export const autorizacionesPorActividad = selectorFamily({
  key: 'autorizacionesPorActividad',
  get: (id) => async ({ get }) => {
    const { data } = get(
      apiIndex({ path: `actividades/${id}/autorizaciones` })
    );
    return data;
  },
});
