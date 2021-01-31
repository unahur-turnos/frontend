import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AltaModificacionActividad from './components/actividades/AltaModificacionActividad';
import AltaModificacionEspacio from './components/espacios/AltaModificacionEspacio';
import { Box } from '@material-ui/core';
import ControlAcceso from './components/actividades/ControlAcceso';
import FinalDDJJ from './components/inscripcionActividad/FinalDDJJ';
import Footer from './components/ui/Footer';
import Header from './components/ui/Header';
import InscripcionActividad from './components/inscripcionActividad/InscripcionActividad';
import ListadoActividades from './components/actividades/ListadoActividades';
import ListadoEspacios from './components/espacios/ListadoEspacios';
import Login from './components/login/Login';
import NavBar from './components/ui/NavBar';
import PrivateRoute from './components/autenticacion/PrivateRoute';
import Registro from './components/registro/Registro';

export default function App() {
  return (
    <>
      <Header />
      <Box>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Login} />

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/registro">
              <Registro />
            </Route>

            <PrivateRoute exact path="/espacios">
              <ListadoEspacios />
            </PrivateRoute>

            <PrivateRoute path="/espacios/nuevo">
              <AltaModificacionEspacio titulo={'Carga de espacios'} />
            </PrivateRoute>

            <PrivateRoute path="/espacios/:id">
              <AltaModificacionEspacio titulo={'Modificar espacio'} />
            </PrivateRoute>

            <PrivateRoute exact path="/actividades">
              <ListadoActividades />
            </PrivateRoute>

            <PrivateRoute path="/actividades/nueva">
              <AltaModificacionActividad titulo={'Carga de actividades'} />
            </PrivateRoute>

            <PrivateRoute path="/actividades/hoy">
              <ControlAcceso />
            </PrivateRoute>

            <PrivateRoute path="/actividades/:id">
              <AltaModificacionActividad titulo={'Modificar actividad'} />
            </PrivateRoute>

            <PrivateRoute path="/autorizaciones/nueva">
              <InscripcionActividad />
            </PrivateRoute>

            <PrivateRoute path="/autorizaciones/confirmacion">
              <FinalDDJJ />
            </PrivateRoute>
          </Switch>
        </Router>
      </Box>
      <Footer />
    </>
  );
}
