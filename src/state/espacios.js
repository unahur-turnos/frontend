import { selector, selectorFamily } from 'recoil';
import { getData } from '../helpers/fetchApi';
import { contadorActualizacionesState } from './actualizaciones';
import { usuarioState } from './usuario';

export const todosLosEspacios = selectorFamily({
  key: 'todosLosEspacios',
  get: (header) => async ({ get }) => {
    get(contadorActualizacionesState('espacios'));
    const { data } = await getData('espacios', get(usuarioState));
    return data;
  },
});

export const espacioPorId = selectorFamily({
  key: 'espacioPorId',
  get: (id, header) => async ({ get }) => {
    get(contadorActualizacionesState('espacios'));
    return id !== undefined
      ? await getData(`espacios/${id}`, get(usuarioState))
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
