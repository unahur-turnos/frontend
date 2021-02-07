import { Grid, makeStyles } from '@material-ui/core';
import logoCovid from '../../assets/logoCovid.png';
import unahur from '../../assets/unahur.png';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import PropTypes from 'prop-types';

export default function PantallaDesktop({ hayUsuarioLogueado }) {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={5} md={4} lg={3}>
        <Link to="/">
          <img src={logoCovid} alt="" className={classes.tamanioLogo} />
          <img src={unahur} alt="" className={classes.tamanioFoto} />
        </Link>
      </Grid>
      <Grid item xs={6} sm={6} md={7}>
        {hayUsuarioLogueado && <NavBar />}
      </Grid>
    </>
  );
}

PantallaDesktop.propTypes = {
  hayUsuarioLogueado: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  tamanioLogo: {
    width: '55px',
    height: '42px',
  },
  tamanioFoto: {
    height: '45px',
  },
}));
