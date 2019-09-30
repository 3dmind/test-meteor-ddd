import {
  Checkbox,
  createStyles,
  IconButton,
  ListItem,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import ArchiveIcon from '@material-ui/icons/Archive'
import DeleteIcon from '@material-ui/icons/Delete'
import * as React from 'react'
import { TaskUiModel } from '../../TaskUiModel'
import { useActions } from '../TaskActions'

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
          <Typography component={'p'}>{description}</Typography>
        </div>
        <div className={classes.secondaryAction}>
          <IconButton onClick={handleClickArchive}>
            <ArchiveIcon />
          </IconButton>
          <IconButton onClick={handleClickDiscard}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </ListItem>
  )
}
