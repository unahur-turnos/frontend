import { apiById, apiIndex } from './api';

import { DateTime } from 'luxon';
import { dateFormatter } from '../utils/dateUtils';
import { selectorFamily } from 'recoil';

export const todasLasActividades = selectorFamily({
  key: 'todasLasActividades',
  get: (filtro) => async ({ get }) => {
    const { data } = get(apiIndex({ path: 'actividades', filtro }));
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
            activa: true,
          },
        },
});
