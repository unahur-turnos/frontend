import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getData = async (route) => {
  try {
    const response = await instance.get(route);
    return response.data;
  } catch (error) {
    console.log(`Error al obtener los datos: ${error}`);
  }
};

export const create = async (route, data) => {
  try {
    const response = await instance.post(route, data);
    return response.data;
  } catch (error) {
    console.log(`Error al dar de alta: ${error}`);
  }
};

export const update = async (route, id, data) => {
  try {
    console.log(`${route}/${id}`);
    const response = await instance.put(`${route}/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(`Error al actualizar: ${error}`);
  }
};

export const deleteById = async (route, id) => {
  try {
    const response = await instance.delete(`${route}/${id}`);
    return response;
  } catch (error) {
    console.log(`Error al eliminar: ${error}`);
  }
};
