import { Button, withStyles } from '@material-ui/core';

export const DangerButton = withStyles(({ palette }) => ({
  root: {
    color: palette.error.contrastText,
    backgroundColor: palette.error.main,
    '&:hover': {
      backgroundColor: palette.error.dark,
    },
  },
}))(Button);
