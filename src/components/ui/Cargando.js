import { CircularProgress, Grid, Typography } from '@material-ui/core';

export default function Cargando() {
  return (
    <Grid
      container
      direction="column"
      alignContent="center"
      alignItems="center"
    >
      <CircularProgress size={30} />
      <Typography variant="subtitle1" color="textSecondary">
        Por favor, aguardá unos instantes...
      </Typography>
    </Grid>
  );
}
