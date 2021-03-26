import { AYUDAS, ERRORES } from '../textos/Textos';
import {
  Box,
  Button,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from 'react-material-ui-form-validator';
import { formatISO, hourFormatter } from '../../utils/dateUtils';
import { find, propEq } from 'ramda';
import { useHistory, useParams } from 'react-router-dom';

import { Autocomplete } from '@material-ui/lab';
import { BotonGuardar } from '../ui/BotonGuardar';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import { actividadPorId } from '../../state/actividades';
import { todasLasCarreras } from '../../state/carreras';
import { todosLosEspacios } from '../../state/espacios';
import { useApi } from '../../utils/fetchApi';
import { useInputStyles } from '../../utils/numberFieldWithoutArrows';
import { useNotificarActualizacion } from '../../state/actualizaciones';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

export default function AltaActividad(props) {
  const inputClasses = useInputStyles();
  const { id } = useParams();
  const { titulo } = props;
  const actividadDB = useRecoilValue(actividadPorId(id));
  const notificarActualizacion = useNotificarActualizacion('actividades');
  const history = useHistory();
  const { create, update } = useApi('actividades');
  const [iconoCargando, setIconoCargando] = useState(false);
  const espacios = useRecoilValue(todosLosEspacios);
  const carreras = useRecoilValue(todasLasCarreras);
  const [actividad, setActividad] = useState(actividadDB.data);
  const {
    espacioId,
    nombre,
    fechaHoraInicio,
    fechaHoraFin,
    responsable,
    telefonoDeContactoResponsable,
    activa,
    restriccionId,
  } = actividad;

  const [horarios, setHorarios] = useState([
    {
      id: 0,
      horaInicio: hourFormatter(fechaHoraInicio),
      horaFin: hourFormatter(fechaHoraFin),
    },
  ]);
  const carreraSeleccionada = find(propEq('id', restriccionId), carreras);

  ValidatorForm.addValidationRule(
    'fechaActividadValida',
    (value) => formatISO(value) >= DateTime.local().toISODate()
  );

  ValidatorForm.addValidationRule(
    'fechaInicioValida',
    (value) => hourFormatter(value) > hourFormatter(DateTime.local())
  );

  ValidatorForm.addValidationRule(
    'fechaFinValida',
    (value) => hourFormatter(value) > hourFormatter(fechaHoraInicio)
  );

  const handleChange = (e) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  const saveData = async () => {
    setIconoCargando(true);
    if (id !== undefined) {
      await update(actividad);
    } else {
      await create(actividad);
    }

    notificarActualizacion();
    irListaActividades();
  };

  const irListaActividades = () => {
    history.push('/actividades');
  };

  const handleChangeHour = (id, event) => {
    const newInputFields = horarios.map((horario) => {
      if (id === horario.id) {
        horario[event.target.name] = event.target.value;
      }
      return horario;
    });

    setHorarios(newInputFields);
  };

  const handleAddHour = () => {
    const horarioAnterior = horarios[horarios.length - 1];
    setHorarios([
      ...horarios,
      {
        id: horarios.length,
        horaInicio: horarioAnterior.horaInicio,
        horaFin: horarioAnterior.horaFin,
      },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...horarios];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setHorarios(values);
  };

  return (
    <>
      <ValidatorForm onSubmit={saveData} instantValidate={false}>
        <Grid item align="center" xs={12}>
          <Typography variant="h4" color="primary">
            {titulo}
          </Typography>
        </Grid>

        <Grid container spacing={4} align="center">
          <Grid item xs={12}>
            <Grid item xs={12} sm={6} md={4} style={{ marginTop: 20 }}>
              <TextValidator
                label="Ingresá el nombre"
                fullWidth
                name="nombre"
                value={nombre || ''}
                onChange={handleChange}
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={6} md={4}>
              <SelectValidator
                fullWidth
                label="Elegí un espacio"
                name="espacioId"
                value={espacioId || ''}
                onChange={handleChange}
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
                align="left"
              >
                {espacios.map((espacio, id) => (
                  <MenuItem value={espacio.id} key={id}>
                    {espacio.nombre}
                  </MenuItem>
                ))}
              </SelectValidator>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={6} md={4}>
              <TextValidator
                label="Persona responsable"
                fullWidth
                name="responsable"
                value={responsable || ''}
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={6} md={4}>
              <TextValidator
                label="Teléfono de contacto responsable"
                fullWidth
                type="number"
                className={inputClasses.numberFieldWithoutArrows}
                name="telefonoDeContactoResponsable"
                value={telefonoDeContactoResponsable || ''}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={6} md={4}>
              <TextValidator
                fullWidth
                type="date"
                name="fechaHoraInicio"
                label="Dia de la actividad"
                value={
                  DateTime.fromISO(fechaHoraInicio).toFormat('yyyy-MM-dd') || ''
                }
                onChange={handleChange}
                validators={['required', 'fechaActividadValida']}
                errorMessages={[ERRORES.requerido, ERRORES.diaActividad]}
              />
            </Grid>
          </Grid>

          {/* <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <Autocomplete
                fullWidth
                options={carreras}
                getOptionLabel={(carrera) => carrera.nombre}
                defaultValue={{ nombre: carreraSeleccionada?.nombre }}
                noOptionsText="No hay carreras que coincidan con la búsqueda"
                onChange={(event, carrera) => {
                  setActividad({
                    ...actividad,
                    restriccionId: carrera?.id || null,
                  });
                }}
                renderInput={(params) => (
                  <TextValidator
                    {...params}
                    label="Buscá a qué carrera está destinada"
                    helperText={AYUDAS.selectorCarreras}
                  />
                )}
              />
            </Grid>
          </Grid> */}
          {console.log(horarios)}
          {horarios.map((horario) => {
            return (
              <Grid
                item
                xs={12}
                component={Box}
                display="flex"
                flexDirection="row"
                justifyContent="center"
                key={horario.id}
              >
                <Grid item xs={5} sm={2} md={1}>
                  <TextValidator
                    fullWidth
                    type="time"
                    name="horaInicio"
                    value={hourFormatter(horario.horaInicio) || ''}
                    label="Hora inicio"
                    onChange={(event) => handleChangeHour(horario.id, event)}
                    validators={['required', 'fechaFinValida']}
                    errorMessages={[ERRORES.requerido, ERRORES.fechaFin]}
                  />
                </Grid>
                <Grid item xs={5} sm={2} md={1}>
                  <TextValidator
                    fullWidth
                    type="time"
                    name="horaFin"
                    value={hourFormatter(horario.horaFin) || ''}
                    label="Hora cierre"
                    onChange={(event) => handleChangeHour(horario.id, event)}
                    validators={['required', 'fechaFinValida']}
                    errorMessages={[ERRORES.requerido, ERRORES.fechaFin]}
                    style={{ marginLeft: 30 }}
                  />
                </Grid>
                <Grid item xs={1} sm={2}>
                  {horario.id === 0 ? (
                    <Fab color="primary" size="small" onClick={handleAddHour}>
                      <AddIcon />
                    </Fab>
                  ) : (
                    <IconButton aria-label="delete">
                      <DeleteIcon
                        onClick={() => handleRemoveFields(horario.id)}
                      />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            );
          })}

          <Grid
            container
            component={Box}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            <FormLabel component="legend">Estado:</FormLabel>
            <FormControl>
              <RadioGroup
                row
                aria-label="activa"
                name="activa"
                value={activa.toString()}
                onChange={handleChange}
                style={{ marginLeft: 20 }}
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
        <Grid container spacing={1} style={{ marginTop: 20 }}>
          <Grid item xs={6} align="right">
            <Button onClick={irListaActividades}>Cancelar</Button>
          </Grid>
          <Grid item xs={6}>
            <BotonGuardar loading={iconoCargando} />
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}

AltaActividad.propTypes = {
  titulo: PropTypes.string,
};
