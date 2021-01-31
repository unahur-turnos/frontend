import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { usuarioState } from '../../state/usuario';
import { useRecoilValue } from 'recoil';

export default function PrivateRoute({ children, ...rest }) {
  const estadoUsuario = useRecoilValue(usuarioState);

  const validarRutaConRol = () => {
    const ruta = rutas.find((rutaJSON) => rutaJSON.ruta == rest.path);

    return ruta.roles.some((rol) => rol == estadoUsuario?.rol) ? (
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

const rutas = [
  { nombre: 'Actividades', ruta: '/actividades', roles: ['admin', 'bedel'] },
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
  { nombre: 'Espacio id', ruta: '/espacios/:id', roles: ['admin', 'bedel'] },
  {
    nombre: 'Crear espacio',
    ruta: '/espacios/nuevo',
    roles: ['admin', 'bedel'],
  },
  { nombre: 'Ver espacios', ruta: '/espacios', roles: ['admin', 'bedel'] },
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

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.object,
};
