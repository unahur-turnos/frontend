import axios from 'axios';
import { has } from 'ramda';
import { useRecoilValue } from 'recoil';
import { usuarioState } from '../state/usuario';

const makeApi = (usuario) =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    ...makeOptions(usuario),
  });

const makeOptions = (usuario) =>
  has('token', usuario)
    ? {
        headers: {
          Authorization: `Bearer ${usuario.token}`,
        },
      }
    : {};

export const getData = async (path, usuario) => {
  const { data } = await makeApi(usuario).get(path);
  return data;
};

export function useApi(path) {
  const usuario = useRecoilValue(usuarioState);
  const api = makeApi(usuario);

  return {
    create: async (entity) => {
      const { data } = await api.post(path, entity);
      return data;
    },
    update: async (entity) => {
      const { data } = await api.put(`${path}/${entity.id}`, entity);
      return data;
    },
    deleteById: async (id) => {
      const { data } = await api.delete(`${path}/${id}`);
      return data;
    },
  };
}
