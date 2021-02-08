import PropTypes from 'prop-types';
import {
  Toolbar,
  IconButton,
  Drawer,
  makeStyles,
  Button,
  MenuItem,
  Grid,
  Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useRecoilValue } from 'recoil';
import { menuNavegacionState } from '../../state/usuario';
import { Link } from 'react-router-dom';
import logoCovid from '../../assets/logoCovid.png';

export default function PantallaMobile(props) {
  const { estadosPantalla, setEstadosPantalla, hayUsuarioLogueado } = props;
  const classes = useStyles();
  const menuNavegacion = useRecoilValue(menuNavegacionState);

  const handleDrawerOpen = () =>
    setEstadosPantalla((prevState) => ({ ...prevState, drawerOpen: true }));

  const handleDrawerClose = () =>
    setEstadosPantalla((prevState) => ({ ...prevState, drawerOpen: false }));

  const getBotonesParaMenu = () => {
    return menuNavegacion.map(({ nombre, ruta }) => {
      return (
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
        <div className={classes.drawerContainer}>
          <MenuItem
            component={Link}
            to="/"
            color="inherit"
            onClick={handleDrawerClose}
          >
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
      <Grid item xs={2}>
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

      <Grid item xs={8} align="center">
        <Link to="/">
          <img src={logoCovid} alt="" className={classes.tamanioLogo} />
        </Link>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  tamanioLogo: {
    width: '55px',
    height: '46px',
  },
}));

PantallaMobile.propTypes = {
  estadosPantalla: PropTypes.object,
  setEstadosPantalla: PropTypes.func,
  hayUsuarioLogueado: PropTypes.bool,
};
