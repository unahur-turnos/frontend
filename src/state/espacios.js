import { selector, selectorFamily } from 'recoil';
import { apiById, apiIndex } from './api';

export const todosLosEspacios = selector({
  key: 'todosLosEspacios',
  get: async ({ get }) => {
    const { data } = get(apiIndex('espacios'));
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
