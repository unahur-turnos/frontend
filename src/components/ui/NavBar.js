import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    marginTop: '40px',
  },
  navColor: {
    backgroundColor: '#4DB6AD',
  },
  button: {
    padding: '15px 40px',
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const [screen, setScreen] = useState('inicio');

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.navColor}>
          <Button
            onClick={() => setScreen('inicio')}
            className={classes.button}
            color="inherit"
            style={{
              backgroundColor: screen.includes('inicio')
                ? '#009688'
                : '#4DB6AD',
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
      </AppBar>
    </div>
  );
}
