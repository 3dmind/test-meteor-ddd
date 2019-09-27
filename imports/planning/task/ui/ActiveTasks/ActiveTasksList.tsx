import * as React from 'react'
import { TaskEntity } from '../../domain/TaskEntity'
import { ActiveTasksListItem } from './ActiveTasksListItem'

interface ActiveTasksListProps {
  taskList: TaskEntity[]
}

export const ActiveTasksList: React.FunctionComponent<ActiveTasksListProps> = (
  props,
) => {
  const { taskList } = props
  return (
    <ul>
      {taskList.map((task: TaskEntity) => (
        <ActiveTasksListItem key={task.id.value} task={task} />
      ))}
    </ul>
  )
}
