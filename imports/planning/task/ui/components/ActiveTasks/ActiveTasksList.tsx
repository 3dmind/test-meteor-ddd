import { List, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import * as React from 'react'
import { TaskUiModel } from '../../TaskUiModel'
import { ActiveTasksListItem } from './ActiveTasksListItem'

interface ActiveTasksListProps {
  taskList: TaskUiModel[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    section: {
      marginBottom: theme.spacing(1),
    },
  }),
)

export const ActiveTasksList: React.FunctionComponent<ActiveTasksListProps> = (
  props,
) => {
  const { taskList } = props
  const classes = useStyles(props)

  if (taskList.length) {
    return (
      <>
        <Typography component={'h2'} variant={'h5'} className={classes.section}>
          Tasks
        </Typography>
        <List dense className={classes.root}>
          {taskList.map((task: TaskUiModel) => (
            <ActiveTasksListItem key={task.id} task={task} />
          ))}
        </List>
      </>
    )
  } else {
    return null
  }
}
