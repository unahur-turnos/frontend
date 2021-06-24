import { apiIndex } from './api';
import { selectorFamily } from 'recoil';

export const inscripcionCarrerasPorUsuario = selectorFamily({
  key: 'inscripcionCarrerasPorUsuario',
  get: (id) => async ({ get }) => {
    const { data } = get(
      apiIndex({ path: `inscripcionCarreras/usuario/${id}` })
    );
    return data;
  },
});
