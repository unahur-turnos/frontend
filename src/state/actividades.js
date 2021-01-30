import { apiById, apiIndex } from './api';
import { selector, selectorFamily } from 'recoil';

import { DateTime } from 'luxon';
import { contadorActualizacionesState } from './actualizaciones';
import { dateFormatter } from '../utils/dateUtils';
import { getData } from '../utils/fetchApi';
import { usuarioState } from './usuario';

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

export const actividadesDelDia = selectorFamily({
  key: 'actividadesDelDía',
  get: (fechaActual) => async ({ get }) => {
    get(contadorActualizacionesState('actividades'));
    const { data } = await getData(
      `actividades/?desde=${fechaActual}&hasta=${fechaActual}`,
      get(usuarioState)
    );
    return data;
  },
});
