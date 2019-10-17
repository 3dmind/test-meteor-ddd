import * as React from 'react'
import { ActiveTasksUiModel } from '../../models'
import { Section, TasksList } from '../common'
import { ActiveTasksListItem } from './ActiveTasksListItem'
import { ActiveTasksProgress } from './ActiveTasksProgress'

interface ActiveTasksListProps {
  activeTasks: ActiveTasksUiModel
}

export const ActiveTasksList: React.FunctionComponent<ActiveTasksListProps> = (
  props,
) => {
  const { activeTasks } = props

  if (activeTasks.hasTasks()) {
    return (
      <>
        <Section title={'Tasks'} />
        <ActiveTasksProgress value={activeTasks.progress} />
        <TasksList dense>
          {activeTasks.tasks.map((task) => (
            <ActiveTasksListItem key={task.id} task={task} />
          ))}
        </TasksList>
      </>
    )
  } else {
    return null
  }
}
