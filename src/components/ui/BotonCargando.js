import { CircularProgress, makeStyles, Button } from '@material-ui/core';
import { PropTypes } from 'prop-types';

export function BotonGuardar({ loading, texto = 'Guardar' }) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={loading}
    >
      {loading ? (
        <CircularProgress color="white" className={classes.loading} size={25} />
      ) : (
        texto
      )}
    </Button>
  );
}

const useStyles = makeStyles(() => ({
  loading: {
    marginRight: '10px',
  },
}));

BotonGuardar.propTypes = {
  loading: PropTypes.bool,
  texto: PropTypes.string,
};
