import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { estaAutorizadoState, usuarioState } from '../../state/usuario';
import { useRecoilValue } from 'recoil';

const rutas = [
  {
    nombre: 'Actividades',
    ruta: '/actividades',
    roles: ['admin', 'bedel'],
  },
  {
    nombre: 'Crear actividad',
    ruta: '/actividades/nueva',
    roles: ['admin', 'bedel'],
  },
  {
    nombre: 'Pedir autorización',
    ruta: '/autorizaciones/nueva',
    roles: ['asistente', 'admin'],
  },
  {
    nombre: 'Confirmar autorización',
    ruta: '/autorizaciones/confirmacion',
    roles: ['asistente', 'admin'],
  },

  {
    nombre: 'Espacio id',
    ruta: '/espacios/:id',
    roles: ['admin', 'bedel'],
  },
  {
    nombre: 'Crear espacio',
    ruta: '/espacios/nuevo',
    roles: ['admin', 'bedel'],
  },
  {
    nombre: 'Ver espacios',
    ruta: '/espacios',
    roles: ['admin', 'bedel'],
  },
  {
    nombre: 'Registro',
    ruta: '/registro',
    roles: ['asistente', 'admin', 'bedel'],
  },
  {
    nombre: 'Confirmar autorización',
    ruta: '/login',
    roles: ['asistente', 'admin', 'bedel'],
  },
];

export default function PrivateRoute({ children, ...rest }) {
  const estaAutorizado = useRecoilValue(estaAutorizadoState);
  const estadoUsuario = useRecoilValue(usuarioState);

  const validarRutaConRol = () => {
    const ruta = rutas.find((rutaJSON) => rutaJSON.ruta == rest.path);

    console.log(rutas);
    return ruta.roles.some((rol) => rol == estadoUsuario?.rol) ? (
      children
    ) : (
      <Redirect to={'/login'} />
    );
  };

  return (
    <>
      {console.log(rest.path)}
      <Route {...rest} render={validarRutaConRol} />
    </>
  );
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.object,
};
