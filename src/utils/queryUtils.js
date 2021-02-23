import queryString from 'query-string';

export const buildPath = (path, filtro = {}) => {
  const query = queryString.stringify(filtro, { skipNull: true });
  return query ? `${path}?${query}` : `${path}`;
};
