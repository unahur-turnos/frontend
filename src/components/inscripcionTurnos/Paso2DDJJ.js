import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';

import { PropTypes } from 'prop-types';

export default function Paso2DDJJ({ handleChange, informacionSeleccionada }) {
  return (
    <>
      <Grid container alignItems="flex-end" spacing={4}>
        <Grid item xs={12} align="center">
          <Typography variant="h6">
            ¿Completaste la capacitación virtual de UNAHUR?
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            <RadioGroup
              row
              aria-label="completoCapacitacion"
              name="completoCapacitacion"
              onChange={handleChange}
              value={informacionSeleccionada.completoCapacitacion}
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
  informacionSeleccionada: PropTypes.obj,
};
