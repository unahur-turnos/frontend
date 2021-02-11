import { Box, CircularProgress } from '@material-ui/core';

export default function Cargando() {
  return (
    <Box mt={5} display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  );
}
