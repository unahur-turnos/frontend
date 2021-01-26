import { selector, selectorFamily } from 'recoil';
import { DateTime } from 'luxon';
import { dateFormatter } from '../utils/dateUtils';
import { apiById, apiIndex } from './api';

export const todasLasActividades = selector({
  key: 'todasLasActividades',
  get: async ({ get }) => {
    const { data } = get(apiIndex('actividades'));
    return data;
  },
});

export const actividadPorId = selectorFamily({
  key: 'actividadPorId',
  get: (id) => async ({ get }) =>
    id !== undefined
      ? get(apiById({ path: 'actividades', id }))
      : {
          data: {
            espacioId: null,
            nombre: '',
            fechaHoraInicio: dateFormatter(DateTime.local()),
            fechaHoraFin: dateFormatter(DateTime.local()),
            responsable: '',
            dniResponsable: null,
            tipoResponsable: '',
            estado: false,
          },
        },
});
