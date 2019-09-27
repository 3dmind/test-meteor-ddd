import * as React from 'react'
import { TaskEntity } from '../../domain/TaskEntity'
import { ArchivedTasksListItem } from './ArchivedTasksListItem'

interface ArchivedTasksListProps {
  taskList: TaskEntity[]
}

export const ArchivedTasksList: React.FunctionComponent<
  ArchivedTasksListProps
> = (props) => {
  const { taskList } = props

  if (taskList.length) {
    return (
      <>
        <h2>Archive</h2>
        <ul>
          {taskList.map((task: TaskEntity) => (
            <ArchivedTasksListItem key={task.id.value} task={task} />
          ))}
        </ul>
      </>
    )
  } else {
    return null
  }
}
