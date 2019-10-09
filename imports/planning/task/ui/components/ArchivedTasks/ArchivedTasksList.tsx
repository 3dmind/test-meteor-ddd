import {
  Button,
  createStyles,
  Divider,
  Grid,
  List,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import * as React from 'react'
import { ArchivedTasksUiModel } from '../../models'
import { useActions } from '../TaskActions'
import { ArchivedTasksListItem } from './ArchivedTasksListItem'

interface ArchivedTasksListProps {
  archivedTasks: ArchivedTasksUiModel
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
  const { archivedTasks } = props
  const { discardArchivedTasksAction } = useActions()
  const classes = useStyles(props)

  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()
    discardArchivedTasksAction(archivedTasks.tasks)
  }

  if (archivedTasks.hasTasks()) {
    return (
      <>
        <Divider className={classes.divider} />
        <Grid
          container
          direction={'row'}
          justify={'space-between'}
          alignItems={'baseline'}
          className={classes.section}
        >
          <Typography component={'h2'} variant={'h5'}>
            Archived tasks
          </Typography>
          <Button onClick={handleClick}>Discard all</Button>
        </Grid>
        <List dense className={classes.root}>
          {archivedTasks.tasks.map((task) => (
            <ArchivedTasksListItem key={task.id} task={task} />
          ))}
        </List>
      </>
    )
  } else {
    return null
  }
}
