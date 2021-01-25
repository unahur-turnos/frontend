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
  style: { width: '25rem', height: '5rem' },
};

export default function BorderRadius() {
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box borderRadius={16} {...defaultProps}>
          <Typography align="center">
            Su solicitud se ha registrado con éxito. Número de solicitud: 9456
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        <Box borderRadius={16} {...defaultProps}>
          <Typography align="center">
            <WarningIcon></WarningIcon>
            Recuerde ingresar al establecimiento con cubrebocas y respetar el
            distanciamiento social.
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        <Box borderRadius={16} {...defaultProps}>
          <Typography align="center">
            <PeopleIcon></PeopleIcon>
            Lleve registro de las personas con las que estará los próximos 3
            días.
          </Typography>
        </Box>
      </Box>

      <Box align="center">
        <Button component={Link} to="/" color="primary">
          Volver al Inicio
        </Button>
      </Box>
    </>
  );
}
