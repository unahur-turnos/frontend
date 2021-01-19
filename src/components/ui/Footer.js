import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: '20px',
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    backgroundColor: '#223238',
    color: '#FFFFFF',
    height: '110px',
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Box>
      <Typography className={classes.root} variant="h5">
        Unahur
      </Typography>
    </Box>
  );
}
