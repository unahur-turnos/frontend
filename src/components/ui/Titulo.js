import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function Titulo({ titulo }) {
  return (
    <Grid item align="center" xs={12}>
      <Typography variant="h4" color="primary">
        {titulo}
      </Typography>
    </Grid>
  );
}

Titulo.propTypes = {
  titulo: PropTypes.string,
};
