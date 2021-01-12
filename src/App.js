import { Box, Container } from '@material-ui/core';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AltaActividad from './components/actividades/AltaActividad';
import Header from './components/ui/Header';
import Home from './components/Home';
import ListadoActividades from './components/actividades/ListadoActividades';
import PantallaEspacios from './components/espacios/PantallaEspacios';

export default function App() {
  return (
    <Container>
      <Header />
      <Box my={4}>
        <Router>
          <Switch>
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
              <AltaActividad />
            </Route>
            <Route path="/actividades/:id">
              <AltaActividad />
            </Route>
          </Switch>
        </Router>
      </Box>
    </Container>
  );
}
