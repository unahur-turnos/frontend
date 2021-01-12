import { selector, selectorFamily } from 'recoil';

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
            fechaHoraInicio: null,
            fechaHoraFin: null,
            responsable: '',
            dniResponsable: null,
            tipoResponsable: '',
            estado: false,
            requiereControl: false,
          },
        },
});
