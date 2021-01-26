import React from 'react';
import Box from '@material-ui/core/Box';
import { Typography, Link, Button } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import PeopleIcon from '@material-ui/icons/People';

const defaultProps = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  style: { width: '40rem', height: '9rem' },
};

export default function BorderRadius() {
  return (
    <>
      {/*probando de poner colores*/}
      <Box display="flex" justifyContent="center" mt={8}>
        <Box borderRadius={16} {...defaultProps} bgcolor="info.main">
          <Typography align="center" variant="h6">
            Su solicitud se ha registrado con éxito. Número de solicitud: 9456
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        <Box borderRadius={16} {...defaultProps} bgcolor="text.disabled">
          <WarningIcon fontSize="large"></WarningIcon>
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
    </>
  );
}
