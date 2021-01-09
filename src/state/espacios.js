import { selector, selectorFamily } from 'recoil';

import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

async function getJsonFromApi(path) {
  const response = await axios.get(`${apiUrl}/${path}`);
  return response.data;
}

export const todosLosEspacios = selector({
  key: 'todosLosEspacios',
  get: async () => (await getJsonFromApi('espacios')).data,
});

export const espacioPorId = selectorFamily({
  key: 'espacioPorId',
  get: (id) => async () => await getJsonFromApi(`espacios/${id}`),
});
