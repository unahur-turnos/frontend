import {
  Button,
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Typography,
  TableBody,
  TableCell,
} from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { PropTypes } from 'prop-types';
import { todasLasAutorizacionesState } from '../../state/usuario';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

export default function MisActividades() {
  const autorizaciones = useRecoilValue(todasLasAutorizacionesState);

  const autorizacionesFuturas = (futuro) =>
    autorizaciones.filter((autorizacion) =>
      futuro
        ? DateTime.fromISO(autorizacion.Actividad.fechaHoraInicio) >
          DateTime.local()
        : DateTime.fromISO(autorizacion.Actividad.fechaHoraInicio) <
          DateTime.local()
    );

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" color="primary">
            Mis actividades
          </Typography>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={12} sm={8} md={10}>
            <Typography variant="h6">Actividades futuras</Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/autorizaciones/nueva"
            >
              Solicitar actividad
            </Button>
          </Grid>
        </Grid>
        <Tabla data={autorizacionesFuturas(true)} />
        <Grid item xs={12}>
          <Typography variant="h6">Actividades pasadas</Typography>
        </Grid>
        <Tabla data={autorizacionesFuturas(false)} />
      </Grid>
    </>
  );
}

function Tabla(props) {
  const { data } = props;
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre actividad</TableCell>
              <TableCell>Responsable</TableCell>
              <TableCell>Hora ingreso</TableCell>
              <TableCell>Hora final</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((autorizacion) => (
              <TableRow key={autorizacion.id}>
                <TableCell>{autorizacion.Actividad.nombre}</TableCell>
                <TableCell>{autorizacion.Actividad.responsable}</TableCell>
                <TableCell>
                  {DateTime.fromISO(autorizacion.Actividad.fechaHoraInicio)
                    .setLocale('es')
                    .toFormat('dd/LL HH:mm')}
                </TableCell>
                <TableCell>
                  {DateTime.fromISO(autorizacion.Actividad.fechaHoraFin)
                    .setLocale('es')
                    .toFormat('dd/LL HH:mm')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

Tabla.propTypes = {
  data: PropTypes.obj,
};
