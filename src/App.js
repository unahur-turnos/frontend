import { Box, Container } from '@material-ui/core';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AltaActividad from './components/actividades/AltaActividad';
import Header from './components/Header';
import Home from './components/Home';
import ListadoActividades from './components/actividades/ListadoActividades';
import PantallaEspacios from './components/PantallaEspacios';
import Espacio from './components/Espacio';

export default function App() {
  return (
    <Container>
      <Header />
      <Box my={4}>
        <Router>
          <Switch>
            <Route path="/espacios/nuevo">
              <Espacio titulo={'Carga de espacios'} />
            </Route>
            <Route path="/espacios/:id">
              <Espacio titulo={'Modificar un espacio'} />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/espacios">
              <PantallaEspacios />
            </Route>
            <Route exact path="/actividades">
              <ListadoActividades />
            </Route>
            <Route path="/actividades/nueva">
              <AltaActividad titulo={'Carga de actividades'} />
            </Route>
            <Route path="/actividades/:id">
              <AltaActividad titulo={'Editar actividad'} />
            </Route>
          </Switch>
        </Router>
      </Box>
    </Container>
  );
}
