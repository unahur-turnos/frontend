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
import TarjetaTurno from './TarjetaTurno';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(17),
    flexBasis: '50%',
    flexShrink: 0,
  },
}));

export default function AcordionTurno(props) {
  const { data } = props;

  return (
    <>
      <Accordion style={{ width: '100%', backgroundColor: '#fafafa' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography variant="h6">Turnos anteriores</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {data.map((autorizacion) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={autorizacion.id}>
                  <TarjetaTurno autorizacion={autorizacion} />
                </Grid>
              );
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

AcordionTurno.propTypes = {
  data: PropTypes.array,
};
