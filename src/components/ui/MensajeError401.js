import React from 'react';
import Grid from '@material-ui/core/Box';
import { Typography, Button, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ProhibidoElPaso2 from '../../assets/prohibidoElPaso2.png';
import { useRecoilValue } from 'recoil';
import { rutaInicialUsuarioState } from '../../state/usuario';

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

export default function MensajeError401() {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const rutaInicialUsuario = useRecoilValue(rutaInicialUsuarioState);

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
              <img src={ProhibidoElPaso2} alt="" height="120px" />
            </Grid>
            <br />
            <Grid item xs={12} mb={matches ? 2 : 1}>
              <Typography
                align="center"
                variant="h6"
                className={classes.colorTexto}
              >
                No tenes los permisos necesarios para ver este contenido
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid align="center">
          <Button
            variant="contained"
            component={Link}
            to={rutaInicialUsuario}
            color="primary"
          >
            Volver al Inicio
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
