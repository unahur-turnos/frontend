import { apiIndex } from './api';
import { selector } from 'recoil';

export const todasLasCarreras = selector({
  key: 'todasLasCarreras',
  get: async ({ get }) => {
    const { data } = get(apiIndex('carreras'));
    return data;
  },
});
