import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getData = async (route) => {
  const response = await api.get(route);
  return response;
};

export const create = async (route, data) => {
  const response = await api.post(route, data);
  return response;
};

export const update = async (route, data) => {
  const response = await api.put(`${route}`, data);
  return response.data;
};

export const deleteById = async (route, id) => {
  const response = await api.delete(`${route}/${id}`);
  return response;
};
