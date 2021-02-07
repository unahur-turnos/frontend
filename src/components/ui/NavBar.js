import { Box, Button } from '@material-ui/core/';
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { menuNavegacionState } from '../../state/usuario';
import { useRecoilValue } from 'recoil';
import { createBrowserHistory } from 'history';

export default function NavBar() {
  const menuNavegacion = useRecoilValue(menuNavegacionState);
  const classes = useStyles();
  const history = createBrowserHistory();

  return (
    <Box>
      {menuNavegacion.map(({ ruta, nombre }, id) => {
        return (
          <Button
            key={id}
            className={classes.button}
            color="inherit"
            style={{
              backgroundColor:
                history.location.pathname === ruta ? '#009688' : '#4DB6AD',
            }}
            component={Link}
            to={ruta}
          >
            {nombre}
          </Button>
        );
      })}
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  button: {
    padding: '15px 40px',
    color: '#FFF',
  },
}));
