import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { usuarioState } from '../../state/usuario';
import { useRecoilValue } from 'recoil';

export default function PrivateRoute({ children, rolesPermitidos, ...rest }) {
  const estadoUsuario = useRecoilValue(usuarioState);

  const validarRutaConRol = () => {
    return rolesPermitidos.some((rol) => rol == estadoUsuario?.rol) ? (
      children
    ) : (
      <Redirect to={'/login'} />
    );
  };

  return (
    <>
      <Route {...rest} render={validarRutaConRol} />
    </>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.object,
  rolesPermitidos: PropTypes.object,
};
