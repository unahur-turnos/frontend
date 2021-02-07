import {
  AppBar,
  Grid,
  Toolbar,
  Zoom,
  makeStyles,
  useScrollTrigger,
} from '@material-ui/core';
import BotonCerrarSesion from './BotonCerrarSesion';
import PropTypes from 'prop-types';
import { hayUsuarioLogueadoState } from '../../state/usuario';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import PantallaDesktop from './PantallaDesktop';
import PantallaMobile from './PantallaMobile';

export default function Header(props) {
  const classes = useStyles();
  const hayUsuarioLogueado = useRecoilValue(hayUsuarioLogueadoState);
  const [estadosPantalla, setEstadosPantalla] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = estadosPantalla;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 800
        ? setEstadosPantalla((prevState) => ({
            ...prevState,
            mobileView: true,
          }))
        : setEstadosPantalla((prevState) => ({
            ...prevState,
            mobileView: false,
          }));
    };

    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());
  }, []);

  return (
    <Grid container>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          {mobileView ? (
            <PantallaMobile
              estadosPantalla={estadosPantalla}
              setEstadosPantalla={setEstadosPantalla}
              hayUsuarioLogueado={hayUsuarioLogueado}
            />
          ) : (
            <PantallaDesktop hayUsuarioLogueado={hayUsuarioLogueado} />
          )}
          <Grid item xs={2} sm={2} md={2}>
            <BotonCerrarSesion />
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#4DB6AD',
  },
}));
