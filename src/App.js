import { Box } from '@material-ui/core';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AltaModificacionActividad from './components/actividades/AltaModificacionActividad';
import AltaModificacionEspacio from './components/espacios/AltaModificacionEspacio';
import PrivateRoute from './components/autenticacion/PrivateRoute';
import Header from './components/ui/Header';
import NavBar from './components/ui/NavBar';
import Footer from './components/ui/Footer';
import ListadoActividades from './components/actividades/ListadoActividades';
import ListadoEspacios from './components/espacios/ListadoEspacios';
import Login from './components/login/Login';
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

            <PrivateRoute path="/actividades/:id">
              <AltaModificacionActividad titulo={'Modificar actividad'} />
            </PrivateRoute>
          </Switch>
        </Router>
      </Box>
      <Footer />
    </>
  );
}
