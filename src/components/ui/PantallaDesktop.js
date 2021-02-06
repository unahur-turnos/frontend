import { Grid, makeStyles, Toolbar } from '@material-ui/core';
import logoCovid from '../../assets/logoCovid.png';
import unahur from '../../assets/unahur.png';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import PropTypes from 'prop-types';

export default function PantallaDesktop({ hayUsuarioLogueado }) {
  const { tamanioImagen, tamanioUnahur } = useStyles();

  return (
    <>
      <Grid item xs={2}>
        <Link to="/">
          <img src={logoCovid} className={tamanioImagen} alt="" />
          <img src={unahur} className={tamanioUnahur} alt="" />
        </Link>
      </Grid>
      <Grid item xs={8}>
        {hayUsuarioLogueado && <NavBar />}
      </Grid>
    </>
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
    backgroundColor: '#C4C4C4',
  },
}));

PantallaDesktop.propTypes = {
  hayUsuarioLogueado: PropTypes.bool,
};
