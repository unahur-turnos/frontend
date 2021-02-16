import { Grid, Typography } from '@material-ui/core';

export default function MisActividades() {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" color="primary">
            Mis actividades
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
