import { apiById, apiIndex } from './api';

import { DateTime } from 'luxon';
import { dateFormatter } from '../utils/dateUtils';
import queryString from 'query-string';
import { selectorFamily } from 'recoil';

export const todasLasActividades = selectorFamily({
  key: 'todasLasActividades',
  get: (filtro) => async ({ get }) => {
    const { data } = get(apiIndex(buildPath(filtro)));
    return data;
  },
});

const buildPath = ({ desde, hasta } = {}) => {
  const query = queryString.stringify(
    {
      desde,
      hasta,
    },
    { skipNull: true }
  );
  return query ? `actividades/?${query}` : 'actividades';
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
