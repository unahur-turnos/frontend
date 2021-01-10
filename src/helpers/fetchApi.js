import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getData = async (route) => {
  try {
    const response = await instance.get(route);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const create = async (route, data) => {
  try {
    const response = await instance.post(route, { data });
    return response.data;
  } catch (error) {
    console.log(`Error al dar de alta: ${error}`);
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
