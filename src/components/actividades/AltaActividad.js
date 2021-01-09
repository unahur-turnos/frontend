import {
  Box,
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
  Button,
} from '@material-ui/core';

export default function AltaActividad() {
  return (
    <>
      <Box mt={8}>
        <Typography variant="h4" color="primary">
          Carga de actividades
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" mt={2}>
        <Box>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="flex-end"
            spacing={3}
          >
            <Grid item xs={6}>
              <Typography variant="h6">Nombre de la actividad:</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="nombre"
                label="Ingrese nombre"
                style={{ minWidth: 250 }}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Para quién va dirigido:</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <RadioGroup row>
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="Estudiantes"
                  />
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="Invitados"
                  />
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="Ambos"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Espacio:</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl style={{ minWidth: 250 }}>
                <InputLabel id="demo-simple-select-label">
                  Elija un espacio
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Fecha/Hora de inicio:</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="fecha-inicio"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Fecha/Hora de cierre:</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="fecha-cierre"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">
                Nombre y apellido del responsable:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="nombreResponsable"
                label="Ingrese el nombre del responsable"
                style={{ minWidth: 250 }}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">DNI del responsable:</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="nombre"
                label="Ingrese DNI del responsable"
                style={{ minWidth: 250 }}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">En calidad de:</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <RadioGroup row>
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="Docente"
                  />
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="Invitado"
                  />
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="No docente"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Destinada a:</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl style={{ minWidth: 250 }}>
                <InputLabel id="demo-simple-select-label">
                  Elija el destino de la actividad
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Estado:</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <RadioGroup row>
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="Activo"
                  />
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="Inactivo"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Tipo de turno:</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <RadioGroup row>
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="Automatico"
                  />
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="A confirmar"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box mt={5}>
          <Button variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
      </Box>
    </>
  );
}
