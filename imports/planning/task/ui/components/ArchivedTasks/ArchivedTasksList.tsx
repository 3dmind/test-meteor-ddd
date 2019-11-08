import { Button, Grid } from '@material-ui/core'
import * as React from 'react'
import { ArchivedTasksPresenter } from '../../models'
import { Section, SectionDivider, TasksList } from '../common'
import { useActions } from '../TaskActions'
import { ArchivedTasksListItem } from './ArchivedTasksListItem'

interface ArchivedTasksListProps {
  archivedTasks: ArchivedTasksPresenter
}

export const ArchivedTasksList: React.FunctionComponent<
  ArchivedTasksListProps
> = (props) => {
  const { archivedTasks } = props
  const { discardArchivedTasksAction } = useActions()

  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()
    discardArchivedTasksAction(archivedTasks.tasks)
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
    )
  } else {
    return null
  }
}
