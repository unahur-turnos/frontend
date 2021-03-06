import {
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PropTypes } from 'prop-types';
import TarjetaTurno from './TarjetaTurno';

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
            {data.map((turno) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={turno.id}>
                  <TarjetaTurno turno={turno} />
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
