import { Divider, Theme, withStyles } from '@material-ui/core';

export const SectionDivider = withStyles((theme: Theme) => {
  return {
    root: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  };
})(Divider);
