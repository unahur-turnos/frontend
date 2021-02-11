import { Box, makeStyles } from '@material-ui/core';
import logoCovid from '../../assets/logoCovid.png';
import unahur from '../../assets/unahur.png';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { hayUsuarioLogueadoState } from '../../state/usuario';

export default function PantallaDesktop() {
  const classes = useStyles();
  const hayUsuarioLogueado = useRecoilValue(hayUsuarioLogueadoState);

  return (
    <>
      <Box display="flex" flexDirection="row" width="100%">
        <Link to="/">
          <img src={logoCovid} alt="" className={classes.tamanioLogo} />
          <img src={unahur} alt="" className={classes.tamanioFoto} />
        </Link>
        {hayUsuarioLogueado && <NavBar />}
      </Box>
    </>
  );
}

PantallaDesktop.propTypes = {
  hayUsuarioLogueado: PropTypes.bool,
};

const useStyles = makeStyles(() => ({
  tamanioLogo: {
    width: '55px',
    height: '42px',
  },
  tamanioFoto: {
    height: '45px',
  },
}));
