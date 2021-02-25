import { apiIndex } from './api';
import { selector, selectorFamily } from 'recoil';

export const turnosPorActividad = selectorFamily({
  key: 'turnosPorActividad',
  get: (id) => async ({ get }) => {
    const { data } = get(apiIndex({ path: `actividades/${id}/turnos` }));
    return data;
  },
});
