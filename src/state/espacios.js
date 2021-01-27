import { selector, selectorFamily } from 'recoil';
import { getData } from '../helpers/fetchApi';
import { contadorActualizacionesState } from './actualizaciones';

export const todosLosEspacios = selectorFamily({
  key: 'todosLosEspacios',
  get: (header) => async ({ get }) => {
    get(contadorActualizacionesState('espacios'));
    const { data } = await getData('espacios', header);
    return data;
  },
});

export const espacioPorId = selectorFamily({
  key: 'espacioPorId',
  get: (id, header) => async ({ get }) => {
    get(contadorActualizacionesState('espacios'));
    return id !== undefined
      ? await getData(`espacios/${id}`, header)
      : {
          data: {
            edificioId: '',
            aforo: '',
            nombre: '',
            piso: '',
            habilitado: 'true',
          },
        };
  },
});
