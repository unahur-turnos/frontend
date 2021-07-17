import { AYUDAS, ERRORES } from '../textos/Textos';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from 'react-material-ui-form-validator';
import {
  formatCurrentDay,
  formatDateToDay,
  formatISO,
  getDateOnly,
  horarioComparable,
  hourFormatter,
} from '../../utils/dateUtils';
import { find, pick, propEq } from 'ramda';
import { useHistory, useParams } from 'react-router-dom';
import { BotonGuardar } from '../ui/BotonGuardar';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import { actividadPorId, todasLasActividades } from '../../state/actividades';
import { todasLasCarreras } from '../../state/carreras';
import { todosLosEspacios } from '../../state/espacios';
import { useApi } from '../../utils/fetchApi';
import { useInputStyles } from '../../utils/numberFieldWithoutArrows';
import { useNotificarActualizacion } from '../../state/actualizaciones';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Titulo from '../ui/Titulo';
import DeleteIcon from '@material-ui/icons/Delete';

export default function AltaActividad({ titulo, esParaDuplicar = false }) {
  const inputClasses = useInputStyles();
  const { id } = useParams();
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
  const actividades = useRecoilValue(
    todasLasActividades({ desde: fechaHoraInicio })
  );
  const [diaDeHoy, setDiaDeHoy] = useState(formatCurrentDay(fechaHoraInicio));
  // const carreraSeleccionada = find(propEq('id', restriccionId), carreras);

  const getHorarioByAttrInList = (atributo, valor, lista) =>
    find(propEq(atributo, valor), lista);

  const getHorariosOrdenados = () =>
    horarios.sort(
      (a, b) =>
        formatDateToDay(diaDeHoy, a.horaInicio) <
        formatDateToDay(diaDeHoy, b.horaInicio)
    );

  const getActividadesDe = (fecha) =>
    actividades.filter(
      (actividad) =>
        getDateOnly(actividad.fechaHoraInicio) === getDateOnly(fecha) &&
        actividad.espacioId === espacioId
    );

  ValidatorForm.addValidationRule(
    'fechaActividadValida',
    (value) => formatISO(value) >= DateTime.local().toISODate()
  );

  ValidatorForm.addValidationRule('horarioDisponible', (value) => {
    const { horaInicio, horaFin } = getHorarioByAttrInList(
      'horaInicio',
      value,
      getHorariosOrdenados()
    );
    const actividadesDeHoy = getActividadesDe(formatISO(diaDeHoy));
    const actividadesDeHoyFormateadas = actividadesDeHoy.map((actividad) => {
      return {
        ...actividad,
        fechaHoraFin: DateTime.fromISO(actividad.fechaHoraFin).setLocale('es'),
        fechaHoraInicio: DateTime.fromISO(actividad.fechaHoraInicio).setLocale(
          'es'
        ),
      };
    });

    const horariosDeHoy = actividadesDeHoyFormateadas.map((actividad) => ({
      inicio: actividad.fechaHoraInicio,
      fin: actividad.fechaHoraFin,
    }));
    const horariosDeHoyOrdenados = horariosDeHoy.sort(
      (a, b) => horarioComparable(a.inicio) >= horarioComparable(b.inicio)
    );

    const horaInicioFormateada = DateTime.fromISO(
      formatDateToDay(diaDeHoy, horaInicio)
    ).setLocale('es');
    const horaFinFormateada = DateTime.fromISO(
      formatDateToDay(diaDeHoy, horaFin)
    ).setLocale('es');

    const horarioOcupado = horariosDeHoyOrdenados.some((horario) => {
      const { inicio, fin } = horario;
      const inicioEstaEntre =
        inicio >= horaInicioFormateada && inicio <= horaFinFormateada;
      const finEstaEntre =
        fin >= horaInicioFormateada && fin <= horaFinFormateada;

      return inicioEstaEntre || finEstaEntre;
    });

    return !horarioOcupado;
  });

  ValidatorForm.addValidationRule('fechaInicioValida', (value) => {
    const horarioActual = getHorarioByAttrInList(
      'horaInicio',
      value,
      getHorariosOrdenados()
    );
    const { horaInicio, horaFin } = horarioActual;

    return horarioComparable(horaInicio) < horarioComparable(horaFin);
  });

  ValidatorForm.addValidationRule('fechaFinValida', (value) => {
    const horarioActual = getHorarioByAttrInList(
      'horaFin',
      value,
      getHorariosOrdenados()
    );
    const { horaInicio, horaFin } = horarioActual;

    return horarioComparable(horaFin) > horarioComparable(horaInicio);
  });

  const handleChange = (e) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  const saveData = async () => {
    setIconoCargando(true);
    let body = await parsearObjetosPorHora();
    if (id !== undefined && !esParaDuplicar) {
      await update(body[0]);
    } else {
      if (esParaDuplicar) {
        body = body.map((item) => {
          return pick(
            [
              'espacioId',
              'nombre',
              'fechaHoraInicio',
              'fechaHoraFin',
              'responsable',
              'telefonoDeContactoResponsable',
              'activa',
            ],
            item
          );
        });
      }
      await create(body);
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
        horario[event.name] = event.value;
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
        id: horarioAnterior.id + 1,
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

  const parsearObjetosPorHora = async () => {
    return new Promise((resolve, reject) => {
      const data = horarios.map((horario) => {
        return {
          ...actividad,
          fechaHoraInicio: formatDateToDay(diaDeHoy, horario.horaInicio),
          fechaHoraFin: formatDateToDay(diaDeHoy, horario.horaFin),
        };
      });
      resolve(data);
    });
  };

  const inputNombre = () => {
    return (
      <Grid item xs={12}>
        <Grid item xs={12} sm={6} md={4} style={{ marginTop: 20 }}>
          <TextValidator
            fullWidth
            disabled={esParaDuplicar}
            label="Ingresá el nombre"
            name="nombre"
            value={nombre || ''}
            onChange={handleChange}
            validators={['required']}
            errorMessages={[ERRORES.requerido]}
          />
        </Grid>
      </Grid>
    );
  };

  const inputEspacios = () => {
    return (
      <Grid item xs={12}>
        <Grid item xs={12} sm={6} md={4}>
          <SelectValidator
            fullWidth
            disabled={esParaDuplicar}
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
    );
  };

  const inputResponsable = () => {
    return (
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
    );
  };

  const inputTelefonoResponsable = () => {
    return (
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
    );
  };

  const inputDiaActividad = () => {
    return (
      <Grid item xs={12}>
        <Grid item xs={12} sm={6} md={4}>
          <TextValidator
            fullWidth
            type="date"
            name="fechaHoraInicio"
            label="Dia de la actividad"
            value={diaDeHoy}
            onChange={(e) => setDiaDeHoy(e.target.value)}
            validators={['required', 'fechaActividadValida']}
            errorMessages={[ERRORES.requerido, ERRORES.diaActividad]}
          />
        </Grid>
      </Grid>
    );
  };

  const inputsHorarios = () => {
    return horarios.map((horario, index) => {
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
              value={horario.horaInicio}
              label="Hora inicio"
              onChange={(e) => handleChangeHour(horario.id, e.target)}
              inputProps={{ step: 300 }}
              validators={[
                'required',
                'fechaInicioValida',
                'horarioDisponible',
              ]}
              errorMessages={[
                ERRORES.requerido,
                ERRORES.fechaInicio,
                ERRORES.horarioOcupado,
              ]}
            />
          </Grid>
          <Grid item xs={5} sm={2} md={1}>
            <TextValidator
              fullWidth
              type="time"
              name="horaFin"
              value={horario.horaFin}
              label="Hora cierre"
              onChange={(e) => handleChangeHour(horario.id, e.target)}
              inputProps={{ step: 300 }}
              validators={['required', 'fechaFinValida']}
              errorMessages={[
                ERRORES.requerido,
                ERRORES.fechaFin,
                ERRORES.horarioOcupado,
              ]}
              style={{ marginLeft: 30 }}
            />
          </Grid>
          {(id === undefined || esParaDuplicar) && (
            <Grid item xs={1} sm={2}>
              {index === 0 ? (
                <IconButton color="primary">
                  <AddCircleIcon onClick={handleAddHour} />
                </IconButton>
              ) : (
                <IconButton aria-label="delete">
                  <DeleteIcon onClick={() => handleRemoveFields(horario.id)} />
                </IconButton>
              )}
            </Grid>
          )}
        </Grid>
      );
    });
  };

  const inputEstado = () => {
    return (
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
    );
  };

  /*const inputCarreras = () => {
    return (
      <Grid item xs={12}>
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
      </Grid>
    )
  }*/

  return (
    <>
      <ValidatorForm onSubmit={saveData} instantValidate={false}>
        <Titulo titulo={titulo} />

        <Grid container spacing={4} align="center">
          {inputNombre()}
          {inputEspacios()}
          {inputResponsable()}
          {inputTelefonoResponsable()}
          {inputDiaActividad()}
          {inputsHorarios()}
          {inputEstado()}
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
  esParaDuplicar: PropTypes.bool,
};
