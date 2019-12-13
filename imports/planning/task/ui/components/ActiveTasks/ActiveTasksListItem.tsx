import {
  Checkbox,
  createStyles,
  ListItem,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { Meteor } from 'meteor/meteor'
import * as React from 'react'
import { TaskPresenter } from '../../presenter'
import { useActions } from '../TaskActions'
import { ActiveTaskActions } from './ActiveTaskActions'
import { ActiveTaskDescription } from './ActiveTaskDescription'
import { ActiveTaskMetadata } from './ActiveTaskMetadata'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    task: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
    },
    primaryAction: {
      flex: 0,
    },
    description: {
      flex: 1,
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
    secondaryAction: {
      flex: 0,
      display: 'flex',
    },
  }),
)

interface ActiveTasksListItemProps {
  task: TaskPresenter
}

export const ActiveTasksListItem: React.FunctionComponent<
  ActiveTasksListItemProps
> = (props) => {
  const { task } = props
  const [isEditing, setIsEditing] = React.useState<boolean>(false)
  const {
    tickOffTaskAction,
    resumeTaskAction,
    discardTaskAction,
    archiveTaskAction,
  } = useActions()

  const handleFulfilled = (message: string) => (): void => console.log(message)
  function handleRejected(exception: Meteor.Error): void {
    console.log(exception)
  }

  async function tickOff(): Promise<void> {
    try {
      await tickOffTaskAction(task)
      handleFulfilled('tickedOff')
    } catch (exception) {
      handleRejected(exception)
    }
  }

  async function resume(): Promise<void> {
    try {
      await resumeTaskAction(task)
      handleFulfilled('resumed')
    } catch (exception) {
      handleRejected(exception)
    }
  }

  function handleChange(): void {
    task.isTickedOff ? resume() : /* otherwise */ tickOff()
  }

  async function handleDiscard(): Promise<void> {
    try {
      await discardTaskAction(task)
      handleFulfilled('discarded')
    } catch (exception) {
      handleRejected(exception)
    }
  }

  async function handleArchive(): Promise<void> {
    try {
      await archiveTaskAction(task)
      handleFulfilled('archived')
    } catch (exception) {
      handleRejected(exception)
    }
  }

  function handleEdit(): void {
    setIsEditing(true)
  }

  function handleCancelEdit(): void {
    setIsEditing(false)
  }

  function handleFinishEditing(): void {
    setIsEditing(false)
  }

  const classes = useStyles(props)
  return (
    <ListItem>
      <div className={classes.task}>
        <div className={classes.primaryAction}>
          <Checkbox
            edge={'start'}
            checked={task.isTickedOff}
            onChange={handleChange}
          />
        </div>
        <div className={classes.description}>
          <ActiveTaskDescription
            task={task}
            isEditing={isEditing}
            onFinishEditing={handleFinishEditing}
          />
        </div>
        <div className={classes.secondaryAction}>
          <ActiveTaskActions
            isEditing={isEditing}
            onArchive={handleArchive}
            onCancelEdit={handleCancelEdit}
            onDiscard={handleDiscard}
            onEdit={handleEdit}
          />
        </div>
        <ActiveTaskMetadata task={task} />
      </div>
    </ListItem>
  )
}
