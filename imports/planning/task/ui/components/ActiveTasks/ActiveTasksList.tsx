import { List, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import * as React from 'react'
import { ActiveTasksUiModel } from '../../models'
import { ActiveTasksListItem } from './ActiveTasksListItem'

interface ActiveTasksListProps {
  activeTasks: ActiveTasksUiModel
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
  const { activeTasks } = props
  const classes = useStyles(props)

  if (activeTasks.hasTasks()) {
    return (
      <>
        <Typography component={'h2'} variant={'h5'} className={classes.section}>
          Tasks
        </Typography>
        <List dense className={classes.root}>
          {activeTasks.tasks.map((task) => (
            <ActiveTasksListItem key={task.id} task={task} />
          ))}
        </List>
      </>
    )
  } else {
    return null
  }
}
