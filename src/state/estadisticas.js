import { apiIndex } from './api';
import { selector } from 'recoil';

export const estadisticasState = selector({
  key: 'estadisticas',
  get: async ({ get }) => get(apiIndex({ path: 'estadisticas' })).data,
});
