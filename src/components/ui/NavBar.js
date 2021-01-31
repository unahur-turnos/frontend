import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Toolbar, Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { tieneRolState } from '../../state/validacionRutaConRol';
import { useRecoilValue } from 'recoil';

const useStyles = makeStyles(() => ({
  appBar: {
    minWidth: '100vw',
    backgroundColor: '#4DB6AD',
  },
  button: {
    padding: '15px 40px',
    color: '#FFF',
  },
}));

export default function NavBar() {
  const tieneRol = useRecoilValue(tieneRolState(['admin', 'bedel']));
  const classes = useStyles();
  const [screenSelected, setScreenSelected] = useState('inicio');

  return (
    <Box display="flex">
      <Toolbar className={classes.appBar}>
        <Button
          onClick={() => setScreenSelected('inicio')}
          className={classes.button}
          color="inherit"
          style={{
            backgroundColor: screenSelected.includes('inicio')
              ? '#009688'
              : '#4DB6AD',
          }}
          component={Link}
          to={`/`}
        >
          Inicio
        </Button>

        {tieneRol && (
          <Button
            onClick={() => setScreenSelected('actividades')}
            className={classes.button}
            color="inherit"
            style={{
              backgroundColor: screenSelected.includes('actividades')
                ? '#009688'
                : '#4DB6AD',
            }}
            component={Link}
            to={`/actividades`}
          >
            Actividades
          </Button>
        )}

        {tieneRol && (
          <Button
            onClick={() => setScreenSelected('espacios')}
            className={classes.button}
            color="inherit"
            style={{
              backgroundColor: screenSelected.includes('espacios')
                ? '#009688'
                : '#4DB6AD',
            }}
            component={Link}
            to={`/espacios`}
          >
            Espacios
          </Button>
        )}
      </Toolbar>
    </Box>
  );
}
