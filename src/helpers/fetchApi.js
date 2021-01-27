import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const makeOptions = (usuario) =>
  usuario
    ? {
        headers: {
          Authorization: `Bearer ${usuario.token}`,
        },
      }
    : {};

export const getData = async (route, usuario) => {
  const response = await api.get(route, makeOptions(usuario));
  return response.data;
};

export const create = async (route, data, usuario) => {
  const response = await api.post(route, data, makeOptions(usuario));
  return response;
};

export const update = async (route, data, usuario) => {
  const response = await api.put(`${route}`, data, makeOptions(usuario));
  return response.data;
};

export const deleteById = async (route, id, usuario) => {
  const response = await api.delete(`${route}/${id}`, makeOptions(usuario));
  return response;
};
