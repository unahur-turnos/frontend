import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Toolbar, Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { listaRutasQueCumpleState } from '../../state/usuario';
import { useRecoilValue } from 'recoil';

const listaRutas = [
  { nombre: 'Actividades', ruta: '/actividades', rolesPermitidos: ['admin'] },
  { nombre: 'Espacios', ruta: '/espacios', rolesPermitidos: ['admin'] },
];

export default function NavBar() {
  const rutasQueCumplenConRol = useRecoilValue(
    listaRutasQueCumpleState(listaRutas)
  );
  const classes = useStyles();
  const [screenSelected, setScreenSelected] = useState('/actividades');

  return (
    <Box display="flex">
      <Toolbar className={classes.appBar}>
        {rutasQueCumplenConRol.map(({ ruta, nombre }, id) => {
          return (
            <Button
              key={id}
              onClick={() => setScreenSelected(ruta)}
              className={classes.button}
              color="inherit"
              style={{
                backgroundColor: screenSelected.includes(ruta)
                  ? '#009688'
                  : '#4DB6AD',
              }}
              component={Link}
              to={ruta}
            >
              {nombre}
            </Button>
          );
        })}
      </Toolbar>
    </Box>
  );
}

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
