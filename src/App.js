import { Box, Container } from '@material-ui/core';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Header from './components/ui/Header';
import AltaModificacionActividad from './components/actividades/AltaModificacionActividad';
import AltaModificacionEspacio from './components/espacios/AltaModificacionEspacio';
import ListadoActividades from './components/actividades/ListadoActividades';
import ListadoEspacios from './components/espacios/ListadoEspacios';
import Login from './components/login/Login';
import Registro from './components/registro/Registro';

export default function App() {
  return (
    <Container>
      <Header />
      <Box my={4}>
        <Router>
          <Switch>
            <Route exact path="/" />

            <Route path="/login" component={Login} />

            <Route path="/registro" component={Registro} />

            <Route exact path="/espacios" component={ListadoEspacios} />

            <Route path="/espacios/nuevo">
              <AltaModificacionEspacio titulo={'Carga de espacios'} />
            </Route>

            <Route path="/espacios/:id">
              <AltaModificacionEspacio titulo={'Modificar espacio'} />
            </Route>

            <Route exact path="/actividades" component={ListadoActividades} />

            <Route path="/actividades/nueva">
              <AltaModificacionActividad titulo={'Carga de actividades'} />
            </Route>
            <Route path="/actividades/:id">
              <AltaModificacionActividad titulo={'Modificar actividad'} />
            </Route>
          </Switch>
        </Router>
      </Box>
    </Container>
  );
}
