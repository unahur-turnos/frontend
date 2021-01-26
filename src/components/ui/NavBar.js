import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Toolbar, Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';

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
  const classes = useStyles();
  const [screen, setScreen] = useState('inicio');

  return (
    <Box display="flex">
      <Toolbar className={classes.appBar}>
        <Button
          onClick={() => setScreen('inicio')}
          className={classes.button}
          color="inherit"
          style={{
            backgroundColor: screen.includes('inicio') ? '#009688' : '#4DB6AD',
          }}
          component={Link}
          to={`/`}
        >
          Inicio
        </Button>

        <Button
          onClick={() => setScreen('actividades')}
          className={classes.button}
          color="inherit"
          style={{
            backgroundColor: screen.includes('actividades')
              ? '#009688'
              : '#4DB6AD',
          }}
          component={Link}
          to={`/actividades`}
        >
          Actividades
        </Button>

        <Button
          onClick={() => setScreen('espacios')}
          className={classes.button}
          color="inherit"
          style={{
            backgroundColor: screen.includes('espacios')
              ? '#009688'
              : '#4DB6AD',
          }}
          component={Link}
          to={`/espacios`}
        >
          Espacios
        </Button>
      </Toolbar>
    </Box>
  );
}
