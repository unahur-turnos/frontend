import { selector, selectorFamily } from 'recoil';
import { getData } from '../helpers/fetchApi';

export const todosLosEdificios = selector({
  key: 'todosLosEdificios',
  get: async () => (await getData('edificios')).data,
});

export const edificioPorId = selectorFamily({
  key: 'edificioPorId',
  get: (id) => () => getData(`edificios/${id}`),
});
