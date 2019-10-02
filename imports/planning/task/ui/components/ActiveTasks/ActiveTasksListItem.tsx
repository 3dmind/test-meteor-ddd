import {
  Checkbox,
  createStyles,
  IconButton,
  ListItem,
  makeStyles,
  Theme,
} from '@material-ui/core'
import ArchiveIcon from '@material-ui/icons/Archive'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import * as React from 'react'
import { TaskUiModel } from '../../TaskUiModel'
import { useActions } from '../TaskActions'
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

export const ActiveTasksListItem: React.FunctionComponent<TaskUiModel> = (
  props,
) => {
  const { taskId, description, isTickedOff } = props
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
    tickOffTaskAction(taskId)
      .then(handleFulfilled('tickedOff'))
      .catch(handleRejected)
  }

  function resume(): void {
    resumeTaskAction(taskId)
      .then(handleFulfilled('resumed'))
      .catch(handleRejected)
  }

  function handleChange(): void {
    isTickedOff ? resume() : /* otherwise */ tickOff()
  }

  function handleClickDiscard(
    event: React.MouseEvent<HTMLButtonElement>,
  ): void {
    event.preventDefault()
    discardTaskAction(taskId)
      .then(handleFulfilled('discarded'))
      .catch(handleRejected)
  }

  function handleClickArchive(
    event: React.MouseEvent<HTMLButtonElement>,
  ): void {
    event.preventDefault()
    archiveTaskAction(taskId)
      .then(handleFulfilled('archived'))
      .catch(handleRejected)
  }

  function handleClickEdit(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()
    setIsEditing(true)
  }

  function handleClickCancelEdit(
    event: React.MouseEvent<HTMLButtonElement>,
  ): void {
    event.preventDefault()
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
            checked={isTickedOff}
            onChange={handleChange}
          />
        </div>
        <div className={classes.description}>
          <ActiveTaskDescription
            taskId={taskId}
            description={description}
            isEditing={isEditing}
            onFinishEditing={handleFinishEditing}
          />
        </div>
        <div className={classes.secondaryAction}>
          {isEditing ? (
            <IconButton onClick={handleClickCancelEdit}>
              <CancelIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleClickEdit}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton disabled={isEditing} onClick={handleClickArchive}>
            <ArchiveIcon />
          </IconButton>
          <IconButton disabled={isEditing} onClick={handleClickDiscard}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </ListItem>
  )
}
