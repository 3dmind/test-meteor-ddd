import { Checkbox, FormControlLabel, Grid } from '@material-ui/core'
import * as React from 'react'
import { ActiveTasksPresenter } from '../../presenter'
import { Section, TasksList } from '../common'
import { ActiveTasksListItem } from './ActiveTasksListItem'
import { ActiveTasksProgress } from './ActiveTasksProgress'

interface ActiveTasksListProps {
  activeTasks: ActiveTasksPresenter
}

export const ActiveTasksList: React.FunctionComponent<ActiveTasksListProps> = (
  props,
) => {
  const { activeTasks } = props
  const [hideTickedOff, setHideTickedOff] = React.useState<boolean>(false)

  function handleChange(): void {
    setHideTickedOff(!hideTickedOff)
  }

  if (activeTasks.hasTasks()) {
    let filteredTasks
    if (hideTickedOff) {
      filteredTasks = activeTasks.withoutTickedOffTasks()
    } else {
      filteredTasks = activeTasks.allTasks()
    }
    return (
      <>
        <Grid
          container
          direction={'row'}
          justify={'space-between'}
          alignItems={'baseline'}
        >
          <Section title={'Tasks'} />
          <FormControlLabel
            control={
              <Checkbox checked={hideTickedOff} onChange={handleChange} />
            }
            label={'Hide ticked-off'}
          />
        </Grid>
        <ActiveTasksProgress value={activeTasks.progress} />
        <TasksList dense>
          {filteredTasks.map((task) => (
            <ActiveTasksListItem key={task.id} task={task} />
          ))}
        </TasksList>
      </>
    )
  } else {
    return null
  }
}
