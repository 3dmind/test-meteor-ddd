import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      padding: theme.spacing(4, 0, 0, 0),
    },
  }),
);

export const ApplicationContent: React.FunctionComponent = (props) => {
  const { children } = props;
  const classes = useStyles(props);
  return (
    <main className={classes.root}>
      <Container maxWidth={'xl'}>{children}</Container>
    </main>
  );
};
