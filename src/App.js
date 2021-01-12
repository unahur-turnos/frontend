import { Box, Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import PantallaEspacios from './components/PantallaEspacios';
import Espacio from './components/Espacio';

export default function App() {
  return (
    <Container maxWidth="sm">
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
            <Route path="/espacios">
              <PantallaEspacios />
            </Route>
            <Route path="/">
              <PantallaEspacios />
            </Route>
          </Switch>
        </Router>
      </Box>
    </Container>
  );
}
