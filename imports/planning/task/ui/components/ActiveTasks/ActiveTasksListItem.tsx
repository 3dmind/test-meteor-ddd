import {
  Checkbox,
  createStyles,
  ListItem,
  makeStyles,
  Theme,
} from '@material-ui/core'
import * as React from 'react'
import { TaskUiModel } from '../../models'
import { useActions } from '../TaskActions'
import { ActiveTaskActions } from './ActiveTaskActions'
import { ActiveTaskDescription } from './ActiveTaskDescription'

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
  task: TaskUiModel
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
  function handleRejected(error): void {
    console.log(error)
  }

  function tickOff(): void {
    tickOffTaskAction(task)
      .then(handleFulfilled('tickedOff'))
      .catch(handleRejected)
  }

  function resume(): void {
    resumeTaskAction(task)
      .then(handleFulfilled('resumed'))
      .catch(handleRejected)
  }

  function handleChange(): void {
    task.isTickedOff ? resume() : /* otherwise */ tickOff()
  }

  function handleDiscard(): void {
    discardTaskAction(task)
      .then(handleFulfilled('discarded'))
      .catch(handleRejected)
  }

  function handleArchive(): void {
    archiveTaskAction(task)
      .then(handleFulfilled('archived'))
      .catch(handleRejected)
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
      </div>
    </ListItem>
  )
}
