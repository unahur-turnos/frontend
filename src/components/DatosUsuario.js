import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { usuarioPorId } from '../state/usuarios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function DatosUsuario() {
  const { id } = useParams();
  const classes = useStyles();
  const usuario = useRecoilValue(usuarioPorId(id));

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Avatar"
            height="300"
            image={usuario.avatarUrl}
            title="Avatar"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {`${usuario.nombre} ${usuario.apellido}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Nació el {usuario.fechaNacimiento}. Si aún viviera tendría{' '}
              {usuario.edad} años.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Button color="primary" component={Link} to="/">
        Volver
      </Button>
    </>
  );
}
