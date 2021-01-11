import { selector, selectorFamily } from 'recoil';
import { getData } from '../helpers/fetchApi';

export const todosLosEspacios = selector({
  key: 'todosLosEspacios',
  get: async () => (await getData('espacios')).data,
});

export const espacioPorId = selectorFamily({
  key: 'espacioPorId',
  get: (id) => async () =>
    id !== undefined
      ? await getData(`espacios/${id}`)
      : {
          data: {
            Edificio: {
              nombre: '',
              edificioId: '',
            },
            aforo: '',
            nombre: '',
            piso: '',
            habilitado: 'true',
          },
        },
});
