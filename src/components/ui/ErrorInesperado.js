import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

export default function ErrorInesperado() {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item>
          <Typography variant="h5" color="error" gutterBottom>
            Lo sentimos, ocurrió un error inesperado...
          </Typography>
        </Grid>
        <Grid item>
          <SentimentVeryDissatisfiedIcon color="error" />
        </Grid>
      </Grid>
      <Grid container>
        <Typography variant="subtitle1" gutterBottom>
          ¡Ya estamos trabajando para solucionarlo! Mientras tanto, podés{' '}
          <Link to="/">volver al inicio</Link>.
        </Typography>
      </Grid>
    </>
  );
}
