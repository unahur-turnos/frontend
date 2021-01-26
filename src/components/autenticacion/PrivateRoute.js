import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { estaAutorizadoState } from '../../state/usuario';
import { useRecoilValue } from 'recoil';

export default function PrivateRoute({ children, ...rest }) {
  const estaAutorizado = useRecoilValue(estaAutorizadoState);

  return (
    <Route
      {...rest}
      render={() => (estaAutorizado ? children : <Redirect to={'/login'} />)}
    />
  );
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.object,
};
