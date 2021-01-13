import { selector, selectorFamily } from 'recoil';
import { DateTime } from 'luxon';
import { getData } from '../helpers/fetchApi';
import { dateFormatter } from '../utils/dateUtils';

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
            fechaHoraInicio: dateFormatter(DateTime.local()),
            fechaHoraFin: dateFormatter(DateTime.local()),
            responsable: '',
            dniResponsable: null,
            tipoResponsable: '',
            estado: false,
          },
        },
});
