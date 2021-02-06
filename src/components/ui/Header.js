import {
  AppBar,
  Grid,
  Toolbar,
  Zoom,
  makeStyles,
  useScrollTrigger,
} from '@material-ui/core';
import BotonCerrarSesion from './BotonCerrarSesion';
import NavBar from './NavBar';
import PropTypes from 'prop-types';
import { hayUsuarioLogueadoState } from '../../state/usuario';
import logoCovid from '../../assets/logoCovid.png';
import unahur from '../../assets/unahur.png';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
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

export default function Header(props) {
  const classes = useStyles();
  const hayUsuarioLogueado = useRecoilValue(hayUsuarioLogueadoState);

  return (
    <Grid container>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Grid item xs={2}>
            <Link to="/">
              <img src={logoCovid} className={classes.tamanioImagen} alt="" />
              <img src={unahur} className={classes.tamanioUnahur} alt="" />
            </Link>
          </Grid>
          <Grid item xs={8}>
            {hayUsuarioLogueado && <NavBar />}
          </Grid>
          <Grid item xs={2}>
            {hayUsuarioLogueado && <BotonCerrarSesion />}
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
