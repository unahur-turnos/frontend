import { Box, Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import PantallaEspacios from './components/PantallaEspacios';

export default function App() {
  return (
    <Container maxWidth="sm">
      <Header />
      <Box my={4}>
        <Router>
          <Switch>
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
