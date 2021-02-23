import { makeStyles } from '@material-ui/core';

export const useInputStyles = makeStyles({
  numberFieldWithoutArrows: {
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none',
    },
  },
});
