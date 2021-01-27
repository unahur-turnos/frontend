import React from 'react';
import Box from '@material-ui/core/Box';
import { Typography, Link, Button } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles';

const defaultProps = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  style: { width: '40rem', height: '9rem' },
};

const useStyles = makeStyles({
  centrarTexto: {
    marginTop: '60px',
    color: 'white',
  },
  fondoPrimerBox: {
    backgroundColor: 'primary',
  },
});

export default function FinalDDJJ() {
  const classes = useStyles();

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="center" mt={10}>
          <Box
            borderRadius={16}
            {...defaultProps}
            bgcolor="#009688"
            borderColor="#009688"
            className={classes.fondoPrimerBox}
          >
            <Typography
              align="center"
              variant="h6"
              className={classes.centrarTexto}
            >
              Su solicitud se ha registrado con éxito. Número de solicitud: 9456
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center">
          <Box borderRadius={16} {...defaultProps}>
            <WarningIcon fontSize="large" align="center"></WarningIcon>
            <Typography align="center" variant="h6">
              Recuerde ingresar al establecimiento con cubrebocas y respetar el
              distanciamiento social.
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center">
          <Box borderRadius={16} {...defaultProps}>
            <PeopleIcon fontSize="large"></PeopleIcon>
            <Typography align="center" variant="h6">
              Lleve registro de las personas con las que estará los próximos 3
              días.
            </Typography>
          </Box>
        </Box>

        <Box align="center">
          <Button variant="contained" component={Link} to="/" color="primary">
            Volver al Inicio
          </Button>
        </Box>
      </Box>
    </>
  );
}
