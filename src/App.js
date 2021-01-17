import { Box, Container } from '@material-ui/core';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Header from './components/ui/Header';
import AltaModificacionActividad from './components/actividades/AltaModificacionActividad';
import AltaModificacionEspacio from './components/espacios/AltaModificacionEspacio';
import ListadoActividades from './components/actividades/ListadoActividades';
import ListadoEspacios from './components/espacios/ListadoEspacios';
import LoginYRegistro from './components/login/LoginYRegistro';

export default function App() {
  return (
    <Container>
      <Header />
      <Box my={4}>
        <Router>
          <Switch>
            <Route path="/login">
              <LoginYRegistro />
            </Route>
            <Route exact path="/espacios">
              <ListadoEspacios />
            </Route>
            <Route path="/espacios/nuevo">
              <AltaModificacionEspacio titulo={'Carga de espacios'} />
            </Route>
            <Route path="/espacios/:id">
              <AltaModificacionEspacio titulo={'Modificar espacio'} />
            </Route>
            <Route exact path="/actividades">
              <ListadoActividades />
            </Route>
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
