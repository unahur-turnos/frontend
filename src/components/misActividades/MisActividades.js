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
  Fab,
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  AccordionActions,
} from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { PropTypes } from 'prop-types';
import { todasLasAutorizacionesState } from '../../state/usuario';
import { DateTime } from 'luxon';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';

export default function MisActividades() {
  const autorizaciones = useRecoilValue(todasLasAutorizacionesState);
  const classes = useStyles();

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
      <Grid style={{ width: '100%', height: '100%' }}>
        <Fab color="primary" aria-label="add" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" color="primary">
            Mis actividades
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Futuras actividades</Typography>
        </Grid>
        <Acordion data={autorizacionesFuturas(true)} />
        <Grid item xs={12}>
          <Typography variant="h6">Actividades pasadas</Typography>
        </Grid>
        <Acordion data={autorizacionesFuturas(false)} />
      </Grid>
    </>
  );
}

function Acordion(props) {
  const { data } = props;
  const classes = useStyles();

  return (
    <>
      <Divider />
      {data.map((autorizacion) => (
        <Grid container key={autorizacion.id}>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    {autorizacion.Actividad.nombre}{' '}
                  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>
                    {`${DateTime.fromISO(autorizacion.Actividad.fechaHoraInicio)
                      .setLocale('es')
                      .toFormat("D 'de' t 'a'")}
                    ${DateTime.fromISO(autorizacion.Actividad.fechaHoraFin)
                      .setLocale('es')
                      .toFormat('t')}
                    `}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    Responsable: {autorizacion.Actividad.responsable}
                  </Typography>
                </div>
              </AccordionDetails>
              <Divider />
              <AccordionActions>
                <Button size="medium" variant="contained" color="secondary">
                  Cancelar actividad
                </Button>
              </AccordionActions>
            </Accordion>
          </Grid>
        </Grid>
      ))}
      {/* <TableContainer>
        <Table>          
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
      </TableContainer> */}
    </>
  );
}

Acordion.propTypes = {
  data: PropTypes.obj,
};

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  column: {
    flexBasis: '33.33%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));
