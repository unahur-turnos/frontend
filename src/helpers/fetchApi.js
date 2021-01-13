import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getData = async (route) => {
  try {
    const response = await api.get(route);
    return response.data;
  } catch (error) {
    console.log(`Error al obtener los datos: ${error}`);
  }
};

export const create = async (route, data) => {
  try {
    const response = await api.post(route, data);
    return response.data;
  } catch (error) {
    console.log(`Error al dar de alta: ${error}`);
  }
};

export const update = async (route, data) => {
  try {
    const response = await api.put(`${route}`, data);
    return response.data;
  } catch (error) {
    console.log(`Error al actualizar: ${error}`);
  }
};

export const deleteById = async (route, id) => {
  try {
    const response = await api.delete(`${route}/${id}`);
    return response;
  } catch (error) {
    console.log(`Error al eliminar: ${error}`);
  }
};
