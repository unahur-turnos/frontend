import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  text: {
    textAlign: 'center',
    padding: '20px',
    color: '#FFFFFF',
  },
  footer: {
    marginTop: '2vw',
    backgroundColor: '#223238',
    height: '6vw',
    minWidth: '100vw',
    left: 0,
    bottom: 0,
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Box className={classes.footer}>
      <Typography className={classes.text} variant="h4">
        Unahur
      </Typography>
    </Box>
  );
}
