import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import AltaModificacionActividad from './components/actividades/AltaModificacionActividad';
import AltaModificacionEspacio from './components/espacios/AltaModificacionEspacio';
import { Box, Container, makeStyles } from '@material-ui/core';
import ControlAcceso from './components/actividades/ControlAcceso';
import FinalDDJJ from './components/inscripcionTurnos/FinalDDJJ';
import Header from './components/ui/Header';
import InscripcionActividad from './components/inscripcionTurnos/InscripcionActividad';
import ListadoActividades from './components/actividades/ListadoActividades';
import ListadoEspacios from './components/espacios/ListadoEspacios';
import Login from './components/login/Login';
import PrivateRoute from './components/autenticacion/PrivateRoute';
import Registro from './components/registro/Registro';
import Footer from './components/ui/Footer';
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
        path="/turnos/nuevo"
        rolesPermitidos={['asistente', 'admin']}
      >
        <InscripcionActividad />
      </PrivateRoute>

      <PrivateRoute
        path="/turnos/confirmacion"
        rolesPermitidos={['asistente', 'admin']}
      >
        <FinalDDJJ />
      </PrivateRoute>
      <PrivateRoute path="/turnos" rolesPermitidos={['asistente']}>
        <MisActividades />
      </PrivateRoute>

      <Route path="/">
        <Redirect to={hayUsuarioLogueado ? rutaInicialUsuario : '/login'} />
      </Route>
    </Switch>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    minHeight: '72vh',
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <Box>
      <Router>
        <Header />
        <Container className={classes.root}>
          <Suspense fallback={<Cargando />}>
            <ErrorBoundary fallback={<ErrorInesperado />}>
              <Rutas />
            </ErrorBoundary>
          </Suspense>
        </Container>
      </Router>
      <Footer />
    </Box>
  );
}
