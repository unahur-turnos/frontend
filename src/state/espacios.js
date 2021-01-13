import { selector, selectorFamily } from 'recoil';

import { getData } from '../helpers/fetchApi';
import { contadorActualizacionesState } from './actualizaciones';

export const todosLosEspacios = selector({
  key: 'todosLosEspacios',
  get: async ({ get }) => {
    get(contadorActualizacionesState('espacios'));
    const { data } = await getData('espacios');
    return data;
  },
});

export const espacioPorId = selectorFamily({
  key: 'espacioPorId',
  get: (id) => async () =>
    id !== undefined
      ? await getData(`espacios/${id}`)
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
