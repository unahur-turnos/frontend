import { apiById, apiIndex } from './api';
import { selector, selectorFamily } from 'recoil';

export const todosLosEspacios = selector({
  key: 'todosLosEspacios',
  get: async ({ get }) => {
    const { data } = get(apiIndex({ path: 'espacios' }));
    return data;
  },
});

export const espacioPorId = selectorFamily({
  key: 'espacioPorId',
  get: (id) => async ({ get }) =>
    id !== undefined
      ? get(apiById({ path: 'espacios', id }))
      : {
          data: {
            edificioId: '',
            aforo: '',
            nombre: '',
            piso: '',
            habilitado: 'true',
          },
        },
});
