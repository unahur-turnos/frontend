import { selector, selectorFamily } from 'recoil';
import { DateTime } from 'luxon';
import { getData } from '../helpers/fetchApi';
import { dateFormatter } from '../utils/dateUtils';
import { contadorActualizacionesState } from './actualizaciones';
import { usuarioState } from './usuario';

export const todasLasActividades = selector({
  key: 'todasLasActividades',
  get: async ({ get }) => {
    get(contadorActualizacionesState('actividades'));
    const { data } = await getData('actividades', get(usuarioState));
    return data;
  },
});

export const actividadPorId = selectorFamily({
  key: 'actividadPorId',
  get: (id) => async ({ get }) => {
    get(contadorActualizacionesState('actividades'));
    return id !== undefined
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
        };
  },
});
