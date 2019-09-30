import {
  createStyles,
  Divider,
  List,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import * as React from 'react'
import { TaskUiModel } from '../../TaskUiModel'
import { ArchivedTasksListItem } from './ArchivedTasksListItem'

interface ArchivedTasksListProps {
  taskList: TaskUiModel[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    divider: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    section: {
      marginBottom: theme.spacing(1),
    },
  }),
)

export const ArchivedTasksList: React.FunctionComponent<
  ArchivedTasksListProps
> = (props) => {
  const { taskList } = props
  const classes = useStyles(props)

  if (taskList.length) {
    return (
      <>
        <Divider className={classes.divider} />
        <Typography component={'h2'} variant={'h5'} className={classes.section}>
          Archive
        </Typography>
        <List dense className={classes.root}>
          {taskList.map((task: TaskUiModel) => (
            <ArchivedTasksListItem
              key={task.taskId}
              taskId={task.taskId}
              description={task.description}
              isTickedOff={task.isTickedOff}
            />
          ))}
        </List>
      </>
    )
  } else {
    return null
  }
}
