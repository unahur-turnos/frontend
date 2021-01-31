import { Redirect, Route } from 'react-router-dom';
import react from 'react';
import PropTypes from 'prop-types';
import { tieneRolState } from '../../state/validacionRutaConRol';
import { useRecoilValue } from 'recoil';

export default function PrivateRoute({ children, rolesPermitidos, ...rest }) {
  const tieneRol = useRecoilValue(tieneRolState(rolesPermitidos));

  const validacionRuta = () => {
    return tieneRol ? children : <Redirect to={'/login'} />;
  };

  return (
    <>
      <Route {...rest} render={validacionRuta} />
    </>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.object,
  rolesPermitidos: PropTypes.arrayOf(PropTypes.string),
};
