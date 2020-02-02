import { List, Theme, withStyles } from '@material-ui/core';

export const TasksList = withStyles((theme: Theme) => {
  return {
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  };
})(List);
