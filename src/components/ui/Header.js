import {
  AppBar,
  Box,
  Toolbar,
  Zoom,
  makeStyles,
  useScrollTrigger,
} from '@material-ui/core';
import { useEffect, useState } from 'react';

import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MenuNavBar from './MenuNavBar';
import PantallaDesktop from './PantallaDesktop';
import PantallaMobile from './PantallaMobile';
import PropTypes from 'prop-types';
import { hayUsuarioLogueadoState } from '../../state/usuario';
import { useRecoilValue } from 'recoil';

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
            {hayUsuarioLogueado && <MenuNavBar />}
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

function ScrollTop({ children }) {
  const classes = useStyles();

  const trigger = useScrollTrigger({
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
    backgroundColor: theme.palette.secondary.main,
  },
}));

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
};
