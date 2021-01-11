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

import { create } from '../../helpers/fetchApi';
import { todosLosEspacios } from '../../state/espacios';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

export default function AltaActividad() {
  const [actividad, setActividad] = useState({
    espacioId: null,
    nombre: '',
    fechaHoraInicio: null,
    fechaHoraFin: null,
    responsable: '',
    dniResponsable: null,
    tipoResponsable: '',
    estado: false,
    requiereControl: false,
  });

  const {
    espacioId,
    nombre,
    fechaHoraInicio,
    fechaHoraFin,
    responsable,
    dniResponsable,
    tipoResponsable,
    estado,
    requiereControl,
  } = actividad;

  const handleChange = (e) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  const crearActividad = (e) => {
    e.preventDefault();
    create('actividades', {
      espacioId: espacioId,
      nombre: nombre,
      fechaHoraInicio: fechaHoraInicio,
      fechaHoraFin: fechaHoraFin,
      responsable: responsable,
      dniResponsable: dniResponsable,
      tipoResponsable: 'Docente',
      estado: true,
      requiereControl: false,
    });
  };

  const espacios = useRecoilValue(todosLosEspacios);

  return (
    <>
      <Box mt={8}>
        <Typography variant="h4" color="primary">
          Carga de actividades
        </Typography>
      </Box>

      <Grid
        container
        alignItems="flex-end"
        spacing={3}
        style={{ marginTop: '8px' }}
      >
        <Grid item xs={6} align="right">
          <Typography variant="h6">Nombre de la actividad:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="nombre"
            label="Ingrese nombre"
            style={{ minWidth: 250 }}
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6} align="right">
          <Typography variant="h6">Para quién va dirigido:</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <RadioGroup
              row
              aria-label="paraQuienVaDirigido"
              name="paraQuienVaDirigido"
              value={true}
              onChange={handleChange}
            >
              <FormControlLabel
                value={'Estudiantes'}
                control={<Radio color="primary" />}
                label="Estudiantes"
              />
              <FormControlLabel
                value={'Invitados'}
                control={<Radio color="primary" />}
                label="Invitados"
              />
              <FormControlLabel
                value={'Ambos'}
                control={<Radio color="primary" />}
                label="Ambos"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={6} align="right">
          <Typography variant="h6">Espacio:</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl style={{ minWidth: 250 }}>
            <InputLabel id="labelEspacios">Elija un espacio</InputLabel>
            <Select
              labelId="labelEspacios"
              name="espacioId"
              value={espacioId}
              onChange={handleChange}
            >
              {espacios.map((espacio) => (
                <MenuItem value={[espacio.id][0]} key={espacio.id}>
                  {espacio.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} align="right">
          <Typography variant="h6">Fecha/Hora de inicio:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="fecha-inicio"
            type="datetime-local"
            name="fechaHoraInicio"
            value={fechaHoraInicio}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6} align="right">
          <Typography variant="h6">Fecha/Hora de cierre:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="fecha-cierre"
            type="datetime-local"
            name="fechaHoraFin"
            value={fechaHoraFin}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6} align="right">
          <Typography variant="h6">
            Nombre y apellido del responsable:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="responsable"
            label="Ingrese el nombre del responsable"
            style={{ minWidth: 250 }}
            name="responsable"
            value={responsable}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6} align="right">
          <Typography variant="h6">DNI del responsable:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="dniResponsable"
            label="Ingrese DNI del responsable"
            style={{ minWidth: 250 }}
            name="dniResponsable"
            value={dniResponsable}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6} align="right">
          <Typography variant="h6">En calidad de:</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <RadioGroup
              row
              aria-label="tipoResponsable"
              name="tipoResponsable"
              value={tipoResponsable}
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

        <Grid item xs={6} align="right">
          <Typography variant="h6">Destinada a:</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl style={{ minWidth: 250 }}>
            <InputLabel id="demo-simple-select-label">
              Elija el destino de la actividad
            </InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              {}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} align="right">
          <Typography variant="h6">Estado:</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <RadioGroup
              row
              aria-label="estado"
              name="estado"
              value={estado}
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

        <Grid item xs={6} align="right">
          <Typography variant="h6">Tipo de turno:</Typography>
        </Grid>
        <Grid item xs={6}>
          <RadioGroup
            row
            aria-label="requiereControl"
            name="requiereControl"
            value={requiereControl}
            onChange={handleChange}
          >
            <FormControlLabel
              value={'true'}
              control={<Radio color="primary" />}
              label="Automatico"
            />
            <FormControlLabel
              value={'false'}
              control={<Radio color="primary" />}
              label="A confirmar"
            />
          </RadioGroup>
        </Grid>

        <Grid item xs={12} align="center">
          <Button variant="contained" color="primary" onClick={crearActividad}>
            Guardar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
