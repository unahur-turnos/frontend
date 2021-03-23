import axios from 'axios';
import { has } from 'ramda';
import { useRecoilValue } from 'recoil';
import { usuarioState } from '../state/usuario';

const makeApi = (usuario, token) =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    ...makeOptions(usuario, token),
  });

const makeOptions = (usuario, token) => {
  return {
    headers: {
      Authorization: `Bearer ${has('token', usuario) ? usuario.token : token}`,
    },
  };
};

export const getData = async (path, usuario) => {
  const { data } = await makeApi(usuario).get(path);
  return data;
};

export function useApi(path, token = null) {
  const usuario = useRecoilValue(usuarioState);
  const api = makeApi(usuario, token);

  return {
    create: async (entity) => {
      const { data } = await api.post(path, entity);
      return data;
    },
    update: async (entity) => {
      const { data } = await api.put(`${path}/${entity.id}`, entity);
      return data;
    },
    updateWithoutId: async (entity) => {
      const { data } = await api.put(path, entity);
      return data;
    },
    deleteById: async (id) => {
      const { data } = await api.delete(`${path}/${id}`);
      return data;
    },
  };
}
