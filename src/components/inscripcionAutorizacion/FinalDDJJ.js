import React from 'react';
import Grid from '@material-ui/core/Box';
import { Typography, Button, useMediaQuery } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { Link } from 'react-router-dom';

const defaultProps = {
  m: 2,
  border: 1,
  style: { width: '40rem', height: '9rem' },
};

const useStyles = makeStyles(({ palette }) => ({
  colorTexto: {
    color: 'white',
  },
  gridRedondeado: {
    borderRadius: 16,
  },
  gridExitoso: {
    backgroundColor: palette.secondary.dark,
    borderColor: palette.secondary.dark,
  },
}));

export default function FinalDDJJ() {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <>
      <Grid direction="column" justifyContent="center" alignItems="center">
        <Grid mt={matches ? 9 : 4} display="flex" justifyContent="center">
          <Grid
            className={[classes.gridExitoso, classes.gridRedondeado]}
            {...defaultProps}
          >
            <Grid items xs={12} align="center" mt={matches ? 2 : 1}>
              <EventAvailableIcon
                fontSize="large"
                align="center"
                style={{ color: 'white' }}
              />
            </Grid>
            <Typography
              align="center"
              variant="h6"
              className={classes.colorTexto}
            >
              Tu solicitud se registró con éxito.
            </Typography>
          </Grid>
        </Grid>

        <Grid display="flex" justifyContent="center">
          <Grid className={classes.gridRedondeado} {...defaultProps}>
            <Grid items xs={12} align="center" mt={matches ? 2 : 1}>
              <WarningIcon fontSize="large" align="center"></WarningIcon>
            </Grid>
            <Typography align="center" variant="h6">
              Recordá ingresar al establecimiento con cubrebocas y respetar el
              distanciamiento social.
            </Typography>
          </Grid>
        </Grid>

        <Grid display="flex" justifyContent="center">
          <Grid className={classes.gridRedondeado} {...defaultProps}>
            <Grid items xs={12} align="center" mt={matches ? 2 : 1}>
              <PeopleIcon fontSize="large"></PeopleIcon>
            </Grid>
            <Typography align="center" variant="h6">
              Llevá registro de las personas con las que estarás los próximos 3
              días.
            </Typography>
          </Grid>
        </Grid>

        <Grid align="center">
          <Button variant="contained" component={Link} to="/" color="primary">
            Volver al Inicio
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
