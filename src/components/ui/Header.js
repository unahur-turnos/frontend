import {
  AppBar,
  Toolbar,
  Zoom,
  makeStyles,
  useScrollTrigger,
  Box,
} from '@material-ui/core';
import BotonCerrarSesion from './BotonCerrarSesion';
import PropTypes from 'prop-types';
import { hayUsuarioLogueadoState } from '../../state/usuario';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import PantallaDesktop from './PantallaDesktop';
import PantallaMobile from './PantallaMobile';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export default function Header(props) {
  const classes = useStyles();
  const hayUsuarioLogueado = useRecoilValue(hayUsuarioLogueadoState);
  const [estadosPantalla, setEstadosPantalla] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView } = estadosPantalla;

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
    <>
      <Box>
        <AppBar position="static" className={classes.header}>
          <Toolbar id="back-to-top-anchor">
            {mobileView ? (
              <PantallaMobile
                estadosPantalla={estadosPantalla}
                setEstadosPantalla={setEstadosPantalla}
              />
            ) : (
              <PantallaDesktop />
            )}
            {hayUsuarioLogueado && <BotonCerrarSesion />}
          </Toolbar>
        </AppBar>
      </Box>
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}

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
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
