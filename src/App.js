import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import AltaModificacionActividad from './components/actividades/AltaModificacionActividad';
import AltaModificacionEspacio from './components/espacios/AltaModificacionEspacio';
import { Box, Container } from '@material-ui/core';
import ControlAcceso from './components/actividades/ControlAcceso';
import FinalDDJJ from './components/inscripcionAutorizacion/FinalDDJJ';
import Header from './components/ui/Header';
import InscripcionActividad from './components/inscripcionAutorizacion/InscripcionActividad';
import ListadoActividades from './components/actividades/ListadoActividades';
import ListadoEspacios from './components/espacios/ListadoEspacios';
import Login from './components/login/Login';
import PrivateRoute from './components/autenticacion/PrivateRoute';
import Registro from './components/registro/Registro';
import { useRecoilValue } from 'recoil';
import {
  hayUsuarioLogueadoState,
  rutaInicialUsuarioState,
} from './state/usuario';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Cargando from './components/ui/Cargando';
import ErrorInesperado from './components/ui/ErrorInesperado';
import MisActividades from './components/actividades/MisActividades';

function Rutas() {
  const hayUsuarioLogueado = useRecoilValue(hayUsuarioLogueadoState);
  const rutaInicialUsuario = useRecoilValue(rutaInicialUsuarioState);

  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/registro">
        <Registro />
      </Route>

      <PrivateRoute exact path="/espacios" rolesPermitidos={['bedel', 'admin']}>
        <ListadoEspacios />
      </PrivateRoute>

      <PrivateRoute path="/espacios/nuevo" rolesPermitidos={['bedel', 'admin']}>
        <AltaModificacionEspacio titulo={'Carga de espacios'} />
      </PrivateRoute>

      <PrivateRoute path="/espacios/:id" rolesPermitidos={['bedel', 'admin']}>
        <AltaModificacionEspacio titulo={'Modificar espacio'} />
      </PrivateRoute>

      <PrivateRoute path="/turnos" rolesPermitidos={['asistente', 'admin']}>
        <MisActividades />
      </PrivateRoute>

      <PrivateRoute
        path="/actividades/nueva"
        rolesPermitidos={['bedel', 'admin']}
      >
        <AltaModificacionActividad titulo={'Carga de actividades'} />
      </PrivateRoute>

      <PrivateRoute
        path="/actividades/hoy"
        rolesPermitidos={['bedel', 'admin']}
      >
        <ControlAcceso />
      </PrivateRoute>

      <PrivateRoute
        path="/actividades/:id"
        rolesPermitidos={['bedel', 'admin']}
      >
        <AltaModificacionActividad titulo={'Modificar actividad'} />
      </PrivateRoute>

      <PrivateRoute path="/actividades" rolesPermitidos={['bedel', 'admin']}>
        <ListadoActividades />
      </PrivateRoute>

      <PrivateRoute
        path="/autorizaciones/nueva"
        rolesPermitidos={['asistente', 'admin']}
      >
        <InscripcionActividad />
      </PrivateRoute>

      <PrivateRoute
        path="/autorizaciones/confirmacion"
        rolesPermitidos={['asistente', 'admin']}
      >
        <FinalDDJJ />
      </PrivateRoute>

      <Route path="/">
        <Redirect to={hayUsuarioLogueado ? rutaInicialUsuario : '/login'} />
      </Route>
    </Switch>
  );
}

export default function App() {
  return (
    <Box>
      <Router>
        <Header />
        <Container>
          <Suspense fallback={<Cargando />}>
            <ErrorBoundary fallback={<ErrorInesperado />}>
              <Rutas />
            </ErrorBoundary>
          </Suspense>
        </Container>
      </Router>
    </Box>
  );
}
