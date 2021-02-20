import queryString from 'query-string';

export const buildPath = (path, { desde, hasta, inactivas } = {}) => {
  const query = queryString.stringify(
    {
      desde,
      hasta,
      inactivas,
    },
    { skipNull: true }
  );
  return query ? `${path}?${query}` : `${path}`;
};
