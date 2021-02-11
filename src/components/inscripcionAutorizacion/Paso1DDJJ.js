import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import { todasLasActividades } from '../../state/actividades';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useRecoilValue } from 'recoil';
import HelpIcon from '@material-ui/icons/Help';
import { AYUDAS } from '../textos/Textos';
import { useState } from 'react';

export default function Paso1DDJJ({ handleChange, agregarUnValor }) {
  const matches = useMediaQuery('(min-width:960px)');
  const actividades = useRecoilValue(todasLasActividades());

  const cambioDeActividad = (nombre, actividad) => {
    agregarUnValor(nombre, actividad);
  };

  return (
    <>
      <Grid container alignItems="flex-end" spacing={4}>
        <Grid item xs={12} md={6} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Seleccioná actividad:</Typography>
        </Grid>

        <Grid item xs={12} md={6} align={!matches && 'center'}>
          <FormControl style={{ minWidth: 250 }}>
            <Autocomplete
              options={actividades}
              noOptionsText={'No se encuentra'}
              onChange={(event, newValue) => {
                cambioDeActividad('actividad', newValue);
              }}
              getOptionDisabled={(actividad) =>
                actividad.Espacio.aforo - actividad.autorizaciones === 0
              }
              getOptionLabel={(actividad) => {
                const timeStart = DateTime.fromISO(actividad.fechaHoraInicio)
                  .setLocale('es')
                  .toFormat("cccc dd 'de' T 'a'");
                const timeFinal = DateTime.fromISO(actividad.fechaHoraFin)
                  .setLocale('es')
                  .toFormat('T');

                return `${actividad.nombre} ${timeStart} ${timeFinal}`;
              }}
              id="actividadId"
              name="actividadId"
              blurOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Actividades disponibles:"
                  margin="normal"
                />
              )}
            />
          </FormControl>
          {/* {matches && (
            <ToolTipButton
              mensaje={AYUDAS.autorizacionSelectorActividades}
              margen={25}
            />
            // <Popover mensaje={AYUDAS.autorizacionSelectorActividades} />
          )} */}
          {/* <Popover /> */}
        </Grid>

        <Grid item xs={12} md={6} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Medio de transporte:</Typography>
        </Grid>

        <Grid item xs={12} md={6} align={!matches && 'center'}>
          <FormControl style={{ minWidth: 250 }}>
            <InputLabel id="medioDeTransporte">Elija un transporte</InputLabel>
            <Select
              labelId="medioDeTransporte"
              name="medioDeTransporte"
              onChange={handleChange}
              defaultValue={'Auto'}
            >
              <MenuItem value={'Auto'}>Auto</MenuItem>
              <MenuItem value={'TransportePublico'}>
                Transporte público
              </MenuItem>
              <MenuItem value={'Bicicleta'}>Caminando/Bici</MenuItem>
            </Select>
          </FormControl>
          {
            <ToolTipButton
              mensaje={AYUDAS.autorizacionSelectorTransporte}
              margen={8}
            />
          }
        </Grid>
      </Grid>
    </>
  );
}

function ToolTipButton({ mensaje, margen }) {
  return (
    <>
      <Tooltip title={mensaje} placement="top">
        <IconButton style={{ marginTop: margen }}>
          <HelpIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

function Popover({ mensaje }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Open Popover
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          The content of the Popover.
        </Typography>
      </Popover>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

Paso1DDJJ.propTypes = {
  handleChange: PropTypes.func,
  agregarUnValor: PropTypes.func,
};

ToolTipButton.propTypes = {
  mensaje: PropTypes.string,
  margen: PropTypes.integer,
};

Popover.propTypes = {
  mensaje: PropTypes.string,
};
