import PropTypes from 'prop-types';
import {
  IconButton,
  Drawer,
  makeStyles,
  MenuItem,
  Grid,
  Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useRecoilValue } from 'recoil';
import { menuNavegacionState } from '../../state/usuario';
import { Link, useLocation } from 'react-router-dom';
import logoCovid from '../../assets/logoCovid.png';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ApartmentIcon from '@material-ui/icons/Apartment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import HomeIcon from '@material-ui/icons/Home';

export default function PantallaMobile(props) {
  const { estadosPantalla, setEstadosPantalla, hayUsuarioLogueado } = props;
  const classes = useStyles();
  const menuNavegacion = useRecoilValue(menuNavegacionState);
  const location = useLocation();

  const handleDrawerOpen = () =>
    setEstadosPantalla((prevState) => ({ ...prevState, drawerOpen: true }));

  const handleDrawerClose = () =>
    setEstadosPantalla((prevState) => ({ ...prevState, drawerOpen: false }));

  const getBotonesParaMenu = () => {
    return menuNavegacion.map(({ nombre, ruta }) => {
      return (
        <>
          <MenuItem
            key={nombre}
            component={Link}
            to={ruta}
            color="inherit"
            style={{
              textDecoration: 'none',
            }}
            onClick={() => handleDrawerClose()}
          >
            <IconButton>{getIconByName(nombre)}</IconButton>
            {nombre}
          </MenuItem>
        </>
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
        <div className={classes.drawerContainer}>
          <MenuItem
            component={Link}
            to="/"
            color="inherit"
            onClick={handleDrawerClose}
          >
            <IconButton>
              <HomeIcon />
            </IconButton>
            Inicio
          </MenuItem>
          <Divider />
          {getBotonesParaMenu()}
        </div>
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

      <Grid item xs={10} sm={11} align="center">
        <Link to="/">
          {location.pathname !== '/' && (
            <img src={logoCovid} alt="" className={classes.tamanioLogo} />
          )}
        </Link>
      </Grid>
    </>
  );
}

function getIconByName(name) {
  switch (name) {
    case 'Actividades':
      return <LocalActivityIcon />;

    case 'Espacios':
      return <ApartmentIcon />;

    case 'Autorización':
      return <ListAltIcon />;

    case 'Control de acceso':
      return <AssignmentTurnedInIcon />;
  }
}

const useStyles = makeStyles(() => ({
  tamanioLogo: {
    width: '55px',
    height: '46px',
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
