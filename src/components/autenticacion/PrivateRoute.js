import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { tieneRolState } from '../../state/usuario';
import { useRecoilValue } from 'recoil';
import { hayUsuarioLogueadoState } from '../../state/usuario';

export default function PrivateRoute({ children, rolesPermitidos, ...rest }) {
  const tieneRol = useRecoilValue(tieneRolState(rolesPermitidos));
  const hayUsuarioLogueado = useRecoilValue(hayUsuarioLogueadoState);

  const validacionRuta = () => {
    return tieneRol ? (
      children
    ) : (
      <Redirect to={hayUsuarioLogueado ? '/401' : '/login'} />
    );
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
