import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useRecoilValue } from 'recoil';
import { todosLosUsuarios } from '../state/usuarios';
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { DateTime } from 'luxon';
import { Face } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  alert: {
    width: '100%',
  },
  title: {
    fontSize: 15,
  },
}));

function fechaFormatoHumano(fecha) {
  return DateTime.fromISO(fecha)
    .setLocale('es')
    .toLocaleString(DateTime.DATE_FULL);
}

export default function ListadoUsuarios() {
  const classes = useStyles();
  const usuarios = useRecoilValue(todosLosUsuarios);

  return (
    <Grid container>
      <Alert severity="info" className={classes.alert}>
        Los usuarios que están más abajo vienen de la API.
      </Alert>
      <List className={classes.root}>
        {usuarios.map((it, index) => (
          <>
            <ListItem key={it.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={it.avatarUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={`${it.apellido}, ${it.nombre}`}
                secondary={`Nació el ${fechaFormatoHumano(
                  it.fechaNacimiento
                )}.`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  component={Link}
                  to={`/usuarios/${it.id}`}
                >
                  <Face />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {/* Hack para que no muestre el divider en el último elemento */}
            {index !== usuarios.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </>
        ))}
      </List>
    </Grid>
  );
}
