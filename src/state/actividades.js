import { selector, selectorFamily } from 'recoil';
import { getData } from '../helpers/fetchApi';

export const todasLasActividades = selector({
  key: 'todasLasActividades',
  get: async () => (await getData('actividades')).data,
});

export const actividadPorId = selectorFamily({
  key: 'actividadPorId',
  get: (id) => async () => await getData(`actividades/${id}`),
});
