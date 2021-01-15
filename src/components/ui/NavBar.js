import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.navColor}>
          <Button className={classes.button} color="inherit" href="/">
            Inicio
          </Button>
          <Button
            className={classes.button}
            color="inherit"
            href="/actividades"
          >
            Actividades
          </Button>
          <Button className={classes.button} color="inherit" href="/espacios">
            Espacios
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
