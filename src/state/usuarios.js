import { selector, selectorFamily } from 'recoil';

const apiUrl = process.env.REACT_APP_API_URL;

async function getJsonFromApi(path) {
  const response = await fetch(`${apiUrl}/${path}`);
  return response.json();
}

export const todosLosUsuarios = selector({
  key: 'todosLosUsuarios',
  get: async () => (await getJsonFromApi('usuarios')).data,
});

export const usuarioPorId = selectorFamily({
  key: 'usuarioPorId',
  get: (id) => async () => await getJsonFromApi(`usuarios/${id}`),
});
