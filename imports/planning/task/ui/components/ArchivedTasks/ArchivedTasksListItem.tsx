import {
  createStyles,
  IconButton,
  ListItem,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';
import { TaskPresenter } from '../../presenter';
import { ArchivedAt } from '../common/ArchivedAt';
import { useActions } from '../TaskActions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    task: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
    },
    description: {
      flex: 1,
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      textDecoration: (task: TaskPresenter): string =>
        task.isTickedOff ? 'line-through' : /* otherwise */ 'none',
    },
    secondaryAction: {
      flex: 0,
      display: 'flex',
    },
  }),
);

interface ArchivedTasksListItemProps {
  task: TaskPresenter;
}

export const ArchivedTasksListItem: React.FunctionComponent<
  ArchivedTasksListItemProps
> = (props) => {
  const { task } = props;
  const { discardTaskAction } = useActions();

  function handleFulfilled(): void {
    console.log('discarded');
  }

  function handleRejected(error): void {
    console.log(error);
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    discardTaskAction(task)
      .then(handleFulfilled)
      .catch(handleRejected);
  }

  const classes = useStyles(task);
  return (
    <ListItem>
      <div className={classes.task}>
        <div className={classes.description}>
          <Typography component={'p'}>{task.description}</Typography>
        </div>
        <div className={classes.secondaryAction}>
          <IconButton onClick={handleClick}>
            <DeleteIcon />
          </IconButton>
        </div>
        <ArchivedAt dateFormatted={task.archivedAtFormatted} />
      </div>
    </ListItem>
  );
};
