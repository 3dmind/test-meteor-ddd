import { Button, Grid } from '@material-ui/core';
import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { ArchivedTasksPresenter } from '../../presenter';
import { Section, SectionDivider, TasksList } from '../common';
import { useActions } from '../TaskActions';
import { ArchivedTasksListItem } from './ArchivedTasksListItem';

interface ArchivedTasksListProps {
  archivedTasks: ArchivedTasksPresenter;
}

export const ArchivedTasksList: React.FunctionComponent<
  ArchivedTasksListProps
> = (props) => {
  const { archivedTasks } = props;
  const { discardAllArchivedTasksAction } = useActions();

  function handleFulfilled(): void {
    console.log('All archived tasks discarded.');
  }

  function handleRejected(error: Meteor.Error): void {
    console.log(error);
  }

  async function handleClick(
    event: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> {
    event.preventDefault();
    try {
      await discardAllArchivedTasksAction();
      handleFulfilled();
    } catch (exception) {
      handleRejected(exception);
    }
  }

  if (archivedTasks.hasTasks()) {
    return (
      <>
        <SectionDivider />
        <Grid
          container
          direction={'row'}
          justify={'space-between'}
          alignItems={'baseline'}
        >
          <Section title={'Archived tasks'} />
          <Button onClick={handleClick}>Discard all</Button>
        </Grid>
        <TasksList dense>
          {archivedTasks.tasks.map((task) => (
            <ArchivedTasksListItem key={task.id} task={task} />
          ))}
        </TasksList>
      </>
    );
  } else {
    return null;
  }
};
