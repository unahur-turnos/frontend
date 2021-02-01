import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';

export default function Paso2DDJJ({ handleChange }) {
  return (
    <>
      <Grid container alignItems="flex-end" spacing={4}>
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
              onChange={handleChange}
              defaultValue={'false'}
            >
              <FormControlLabel
                value={'true'}
                control={<Radio color="primary" />}
                label="Si"
              />
              <FormControlLabel
                value={'false'}
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
              onChange={handleChange}
              defaultValue={'false'}
            >
              <FormControlLabel
                value={'true'}
                control={<Radio color="primary" />}
                label="Si"
              />
              <FormControlLabel
                value={'false'}
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
              aria-label="autorizacionCuidar"
              name="autorizacionCuidar"
              onChange={handleChange}
              defaultValue={'false'}
            >
              <FormControlLabel
                value={'true'}
                control={<Radio color="primary" />}
                label="Si"
              />
              <FormControlLabel
                value={'false'}
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
              aria-label="capacitacionUNAHUR"
              name="capacitacionUNAHUR"
              defaultValue={'false'}
              onChange={handleChange}
            >
              <FormControlLabel
                value={'true'}
                control={<Radio color="primary" />}
                label="Si"
              />
              <FormControlLabel
                value={'false'}
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
