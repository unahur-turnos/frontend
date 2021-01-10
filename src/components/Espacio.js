import { Link, useParams } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Espacio(props) {
  const { id } = useParams();
  const { titulo } = props;
  const [estadoEspacio, setEstadoEspacio] = useState('true');

  const handleChange = (event) => {
    setEstadoEspacio(event.target.value);
  };

  return (
    <>
      <Box mt={8}>
        <Typography variant="h4" color="primary">
          {titulo}
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" mt={2}>
        <Box>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="flex-end"
            spacing={3}
          >
            <Grid item xs={6}>
              <Typography variant="h6">Nombre del espacio:</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="nombre"
                label="Ingrese nombre"
                style={{ minWidth: 250 }}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Edificio:</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl style={{ minWidth: 250 }}>
                <InputLabel id="idEdificio">Elija un edificio</InputLabel>
                <Select labelId="labelIdEdificio" id="selectIDEdificio">
                  <MenuItem value={10}>Malvinas</MenuItem>
                  <MenuItem value={20}>Origone A</MenuItem>
                  <MenuItem value={30}>Origone B</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Piso:</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl style={{ minWidth: 250 }}>
                <InputLabel id="idPiso">Elija un piso</InputLabel>
                <Select labelId="labelIdPiso" id="inputIDPiso">
                  <MenuItem value={10}>0</MenuItem>
                  <MenuItem value={20}>1</MenuItem>
                  <MenuItem value={30}>2</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Estado:</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <RadioGroup
                  row
                  aria-label="estado"
                  name="estadoEspacio"
                  value={estadoEspacio}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value={'true'}
                    control={<Radio color="primary" />}
                    label="Activo"
                  />
                  <FormControlLabel
                    value={'false'}
                    control={<Radio color="primary" />}
                    label="Inactivo"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box mt={5}>
          <Button variant="contained" color="primary">
            Guardar
          </Button>
          <Button component={Link} to="/espacios">
            Cancelar
          </Button>
        </Box>
      </Box>
    </>
  );
}

Espacio.propTypes = {
  titulo: PropTypes.string,
};
