import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import * as React from 'react';

interface UserGreeterProps {
  username: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing(2),
    },
  }),
);

export const UserGreeter: React.FunctionComponent<UserGreeterProps> = (
  props,
) => {
  const classes = useStyles(props);
  const { username } = props;
  const greeting = `Hello ${username}! Let's get tasks done.`;
  return (
    <Typography component={'h1'} variant={'h4'} className={classes.title}>
      {greeting}
    </Typography>
  );
};
