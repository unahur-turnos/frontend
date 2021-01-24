import {
  Box,
  Button,
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
} from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';

export default function Paso2DDJJ({ handleChange }) {
  const classes = useStyles();

  return (
    <>
      <Box mt={12} align="center">
        <Typography variant="h4" color="primary">
          Declaración jurada
        </Typography>
      </Box>

      <Grid
        container
        alignItems="flex-end"
        spacing={4}
        style={{ marginTop: '8px' }}
      >
        <Grid item xs={12} align="center">
          <Typography variant="h6">
            ¿Es persona de riesgo? (Padece una enfermedad respiratoria o es
            mayor de 60 años)
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            <RadioGroup
              row
              aria-label="personaDeRiesgo"
              name="personaDeRiesgo"
              value={'Si'}
              onChange={handleChange}
            >
              <FormControlLabel
                value={'Si'}
                control={<Radio color="primary" />}
                label="Si"
              />
              <FormControlLabel
                value={'No'}
                control={<Radio color="primary" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <Typography variant="h6">
            ¿Estuvo en contacto con alguna persona sospechoso de COVID-19
            positivo en los últimos 15 días?
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            <RadioGroup
              row
              aria-label="contactoConAlguien"
              name="contactoConAlguien"
              value={'Si'}
              onChange={handleChange}
            >
              <FormControlLabel
                value={'Si'}
                control={<Radio color="primary" />}
                label="Si"
              />
              <FormControlLabel
                value={'No'}
                control={<Radio color="primary" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <Typography variant="h6">
            ¿Tiene autorización de la aplicación Cuidar?
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            <RadioGroup
              row
              aria-label="contactoConAlguien"
              name="contactoConAlguien"
              value={'Si'}
              onChange={handleChange}
            >
              <FormControlLabel
                value={'Si'}
                control={<Radio color="primary" />}
                label="Si"
              />
              <FormControlLabel
                value={'No'}
                control={<Radio color="primary" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <Typography variant="h6">
            ¿Qué medio de transporte utilizaría para ir a la universidad?
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            <RadioGroup
              row
              aria-label="contactoConAlguien"
              name="contactoConAlguien"
              value={'Si'}
              onChange={handleChange}
            >
              <FormControlLabel
                value={'Si'}
                control={<Radio color="primary" />}
                label="Si"
              />
              <FormControlLabel
                value={'No'}
                control={<Radio color="primary" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <Typography variant="h6">
            ¿Completó la capacitación virtual de UNAHUR?
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            <RadioGroup
              row
              aria-label="contactoConAlguien"
              name="contactoConAlguien"
              value={'Si'}
              onChange={handleChange}
            >
              <FormControlLabel
                value={'Si'}
                control={<Radio color="primary" />}
                label="Si"
              />
              <FormControlLabel
                value={'No'}
                control={<Radio color="primary" />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

Paso2DDJJ.propTypes = {
  handleChange: PropTypes.func,
};

const useStyles = makeStyles({
  marginBotonYTexto: {
    marginTop: '25px',
  },
});
