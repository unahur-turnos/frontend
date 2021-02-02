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
  useMediaQuery,
} from '@material-ui/core';
import { useApi } from '../../utils/fetchApi';
import { PropTypes } from 'prop-types';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { actividadPorId } from '../../state/actividades';
import { useNotificarActualizacion } from '../../state/actualizaciones';
import { dateFormatter } from '../../utils/dateUtils';
import { todosLosEspacios } from '../../state/espacios';
import { DateTime } from 'luxon';
//import * as moment from 'moment';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import ERRORES from '../ErroresText/Errores';

export default function AltaActividad(props) {
  const matches = useMediaQuery('(min-width:600px)');
  const { id } = useParams();
  const { titulo } = props;
  const actividadDB = useRecoilValue(actividadPorId(id));
  const notificarActualizacion = useNotificarActualizacion('actividades');
  const history = useHistory();
  const { create, update } = useApi('actividades');

  ValidatorForm.addValidationRule(
    'fechaInicioValida',
    (value) => DateTime.fromISO(value) > DateTime.local()
  );

  ValidatorForm.addValidationRule(
    'fechaFinValida',
    (value) => value > actividad.fechaHoraInicio
  );

  const [actividad, setActividad] = useState(actividadDB.data);
  const {
    espacioId,
    nombre,
    fechaHoraInicio,
    fechaHoraFin,
    responsable,
    dniResponsable,
  } = actividad;

  const handleChange = (e) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  const saveData = async () => {
    if (id !== undefined) {
      await update(actividad);
    } else {
      await create(actividad);
    }

    notificarActualizacion();
    history.push('/actividades');
  };

  const espacios = useRecoilValue(todosLosEspacios);

  return (
    <>
      <ValidatorForm onSubmit={saveData} instantValidate={false}>
        <Box mt={5} display="flex" justifyContent="center">
          <Typography variant="h4" color="primary">
            {titulo}
          </Typography>
        </Box>

        <Grid
          container
          alignItems="flex-end"
          spacing={matches ? 4 : 2}
          style={{ marginTop: '8px' }}
        >
          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">Nombre de la actividad:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextValidator
              label="Ingrese nombre"
              style={{ minWidth: 250 }}
              name="nombre"
              value={nombre}
              onChange={handleChange}
              validators={['required']}
              errorMessages={[ERRORES.requerido]}
            />
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">Espacio:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <FormControl style={{ minWidth: 250 }}>
              <InputLabel id="labelEspacios">Elija un espacio</InputLabel>
              <Select
                labelId="labelEspacios"
                name="espacioId"
                value={espacioId}
                onChange={handleChange}
                required
              >
                {espacios.map((espacio) => (
                  <MenuItem value={espacio.id} key={espacio.id}>
                    {espacio.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">Fecha/Hora de inicio:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextValidator
              type="datetime-local"
              name="fechaHoraInicio"
              value={dateFormatter(fechaHoraInicio)}
              onChange={handleChange}
              validators={['fechaInicioValida']}
              errorMessages={[ERRORES.fechaInicio]}
            />
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">Fecha/Hora de cierre:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextValidator
              type="datetime-local"
              name="fechaHoraFin"
              value={dateFormatter(fechaHoraFin)}
              onChange={handleChange}
              validators={['fechaFinValida']}
              errorMessages={[ERRORES.fechaFin]}
            />
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">
              Nombre y apellido del responsable:
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextField
              label="Ingrese el nombre del responsable"
              style={{ minWidth: 250 }}
              name="responsable"
              value={responsable}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">DNI del responsable:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextField
              label="Ingrese DNI del responsable"
              style={{ minWidth: 250 }}
              name="dniResponsable"
              value={dniResponsable}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">En calidad de:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <FormControl>
              <RadioGroup
                row
                aria-label="tipoResponsable"
                name="tipoResponsable"
                defaultValue={'Docente'}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={'Docente'}
                  control={<Radio color="primary" />}
                  label="Docente"
                />
                <FormControlLabel
                  value={'Invitado'}
                  control={<Radio color="primary" />}
                  label="Invitado"
                />
                <FormControlLabel
                  value={'No docente'}
                  control={<Radio color="primary" />}
                  label="No docente"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">Estado:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <FormControl>
              <RadioGroup
                row
                aria-label="estado"
                name="estado"
                defaultValue={'true'}
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

          <Grid container item xs={12} align="center" spacing={1}>
            <Grid item xs={6} align="right">
              <Button variant="contained" color="primary" type="submit">
                Guardar
              </Button>
            </Grid>
            <Grid item xs={6} align="left">
              <Button component={Link} to="/actividades">
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}

AltaActividad.propTypes = {
  titulo: PropTypes.string,
};
