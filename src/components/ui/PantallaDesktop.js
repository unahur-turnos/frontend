import { Grid } from '@material-ui/core';
import logoCovid from '../../assets/logoCovid.png';
import unahur from '../../assets/unahur.png';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import PropTypes from 'prop-types';

export default function PantallaDesktop({ hayUsuarioLogueado }) {
  return (
    <>
      {/* <Grid item lg={3} md={4} sm={5} xs={6}> */}
      <Grid item align="left">
        <Link to="/">
          <img src={logoCovid} alt="" />
          <img src={unahur} alt="" />
        </Link>
      </Grid>
      <Grid item align="left">
        {hayUsuarioLogueado && <NavBar />}
      </Grid>
    </>
  );
}

PantallaDesktop.propTypes = {
  hayUsuarioLogueado: PropTypes.bool,
};
