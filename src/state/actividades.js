import { selector, selectorFamily } from 'recoil';

import { DateTime } from 'luxon';
import { getData } from '../helpers/fetchApi';

export const todasLasActividades = selector({
  key: 'todasLasActividades',
  get: async () => (await getData('actividades')).data,
});

export const actividadPorId = selectorFamily({
  key: 'actividadPorId',
  get: (id) => async () =>
    id !== undefined
      ? await getData(`actividades/${id}`)
      : {
          data: {
            espacioId: null,
            nombre: '',
            fechaHoraInicio: DateTime.local().toISO().slice(0, 16),
            fechaHoraFin: DateTime.local().toISO().slice(0, 16),
            responsable: '',
            dniResponsable: null,
            tipoResponsable: '',
            estado: false,
            requiereControl: false,
          },
        },
});
