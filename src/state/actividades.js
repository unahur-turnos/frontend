import { apiById, apiIndex } from './api';

import { DateTime } from 'luxon';
import { dateFormatter } from '../utils/dateUtils';
import queryString from 'query-string';
import { selectorFamily } from 'recoil';

export const todasLasActividades = selectorFamily({
  key: 'todasLasActividades',
  get: (fecha) => async ({ get }) => {
    const { data } = get(apiIndex(buildPath(fecha)));
    return data;
  },
});

const buildPath = (fecha) => {
  const path = 'actividades';
  if (fecha !== null) {
    const query = queryString.stringify(
      {
        desde: fecha.desde,
        hasta: fecha.hasta,
      },
      { skipNull: true }
    );
    return `${path}/?${query}`;
  }
  return path;
};

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
