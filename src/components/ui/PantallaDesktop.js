import { Box, makeStyles } from '@material-ui/core';
import isologo from '../../assets/isologo-blanco.svg';
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
          <img src={isologo} alt="" className={classes.tamanioLogo} />
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
    height: '40px',
    marginTop: '4px',
    marginRight: '20px',
  },
}));
