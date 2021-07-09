import React from 'react';
import Grid from '@material-ui/core/Box';
import { Typography, Button, useMediaQuery } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { Link } from 'react-router-dom';
import logoUnahur from '../../assets/logoUnahur.png';

const defaultProps = {
  m: 2,
  //border: 1,
  style: { padding: '3% 7% 3% 7%' },
};

const useStyles = makeStyles(({ palette }) => ({
  colorTexto: {
    color: '#444A4A',
    fontSize: '25px',
  },
  gridRedondeado: {
    borderRadius: 16,
  },
  gridExitoso: {
    backgroundColor: '#D2E7E2',
    //borderColor: palette.secondary.dark,
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
            <Grid items xs={12} align="center" mt={matches ? 2 : 1}></Grid>
            <Grid align="center">
              <img src={logoUnahur} alt="" />
            </Grid>
            <br />
            <Grid item xs={12} mb={matches ? 2 : 1}>
              <Typography
                align="center"
                variant="h6"
                className={classes.colorTexto}
              >
                Error 401: Acceso no autorizado
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid align="center">
          <Button variant="contained" component={Link} to="/" color="primary">
            Volver al Inicio
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
