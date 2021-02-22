import { Box, Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { menuNavegacionState } from '../../state/usuario';
import { useRecoilValue } from 'recoil';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export default function NavBar() {
  const menuNavegacion = useRecoilValue(menuNavegacionState);
  const classes = useStyles();
  const location = useLocation();

  return (
    <Box>
      {menuNavegacion.map(({ ruta, nombre }, id) => {
        return (
          <Button
            key={id}
            className={clsx(classes.button, {
              [classes.linkActivo]: location.pathname === ruta,
              [classes.linkInactivo]: location.pathname !== ruta,
            })}
            color="inherit"
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

const useStyles = makeStyles(({ palette }) => ({
  button: {
    padding: '15px 40px',
    color: '#FFF',
    marginLeft: '30px',
  },
  linkActivo: {
    backgroundColor: palette.secondary.dark,
  },
  linkInactivo: {
    backgroundColor: palette.secondary.main,
  },
}));
