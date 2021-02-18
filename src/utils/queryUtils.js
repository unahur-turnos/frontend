import queryString from 'query-string';

export const buildPath = (path, { desde, hasta } = {}) => {
  const query = queryString.stringify(
    {
      desde,
      hasta,
    },
    { skipNull: true }
  );
  return query ? `${path}?${query}` : `${path}`;
};
