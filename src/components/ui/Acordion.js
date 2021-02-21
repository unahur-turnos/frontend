import {
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PropTypes } from 'prop-types';
import Tarjeta from '../ui/Tarjeta';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(17),
    flexBasis: '50%',
    flexShrink: 0,
  },
}));

export default function Acordion(props) {
  const { data } = props;
  const classes = useStyles();

  return (
    <>
      <Accordion style={{ width: '100%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography variant="h6">Turnos pasados</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {data.map((autorizacion) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={autorizacion.id}>
                  <Tarjeta autorizacion={autorizacion} />
                </Grid>
              );
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

Acordion.propTypes = {
  data: PropTypes.obj,
};
