import PropTypes from 'prop-types';
import {
  IconButton,
  Drawer,
  makeStyles,
  MenuItem,
  Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useRecoilValue } from 'recoil';
import {
  hayUsuarioLogueadoState,
  menuNavegacionState,
} from '../../state/usuario';
import { Link } from 'react-router-dom';
import isotipo from '../../assets/iso.svg';

export default function PantallaMobile(props) {
  const { estadosPantalla, setEstadosPantalla } = props;
  const classes = useStyles();
  const hayUsuarioLogueado = useRecoilValue(hayUsuarioLogueadoState);
  const menuNavegacion = useRecoilValue(menuNavegacionState);

  const handleDrawerOpen = () =>
    setEstadosPantalla((prevState) => ({ ...prevState, drawerOpen: true }));

  const handleDrawerClose = () =>
    setEstadosPantalla((prevState) => ({ ...prevState, drawerOpen: false }));

  const getBotonesParaMenu = () => {
    return menuNavegacion.map(({ nombre, ruta, icono }, id) => {
      return (
        <MenuItem
          key={id}
          component={Link}
          to={ruta}
          color="inherit"
          style={{
            textDecoration: 'none',
          }}
          onClick={() => handleDrawerClose()}
        >
          <IconButton>{icono}</IconButton>
          {nombre}
        </MenuItem>
      );
    });
  };

  const opcionesDelMenu = () => {
    return (
      <Drawer
        {...{
          anchor: 'left',
          open: estadosPantalla.drawerOpen,
          onClose: handleDrawerClose,
        }}
      >
        <div className={classes.drawerContainer}>{getBotonesParaMenu()}</div>
      </Drawer>
    );
  };

  return (
    <>
      <Grid item xs={2} sm={1}>
        {opcionesDelMenu()}
        {hayUsuarioLogueado && (
          <IconButton
            {...{
              edge: 'start',
              color: 'inherit',
              'aria-label': 'menu',
              'aria-haspopup': 'true',
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Grid>

      <Grid item xs={8} sm={10} align="center">
        <Link to={menuNavegacion[0] ? menuNavegacion[0].ruta : '/login'}>
          <img src={isotipo} alt="" className={classes.tamanioLogo} />
        </Link>
      </Grid>
    </>
  );
}

const useStyles = makeStyles(() => ({
  tamanioLogo: {
    height: '36px',
  },
  drawerContainer: {
    padding: '20px 30px',
    width: '100%',
  },
}));

PantallaMobile.propTypes = {
  estadosPantalla: PropTypes.object,
  setEstadosPantalla: PropTypes.func,
  hayUsuarioLogueado: PropTypes.bool,
};
