import { selector, selectorFamily } from 'recoil';
import { getData } from '../utils/fetchApi';
import { usuarioState } from './usuario';

export const todosLosEdificios = selector({
  key: 'todosLosEdificios',
  get: async ({ get }) => (await getData('edificios', get(usuarioState))).data,
});

export const edificioPorId = selectorFamily({
  key: 'edificioPorId',
  get: (id) => ({ get }) => getData(`edificios/${id}`, get(usuarioState)),
});
