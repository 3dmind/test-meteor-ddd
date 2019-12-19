import { useTracker } from 'meteor/react-meteor-data'
import * as React from 'react'
import { TaskUiService } from '../../services'
import { ActiveTasksList } from './ActiveTasksList'

interface ContainerProps {
  isLoading: boolean
}

export const ActiveTasksContainer: React.FunctionComponent<ContainerProps> = (
  props,
) => {
  const { isLoading } = props
  const activeTasks = useTracker(function fetch() {
    return TaskUiService.getAllActiveTasks()
  }, [])

  if (isLoading) {
    return null
  }

  return <ActiveTasksList activeTasks={activeTasks} />
}
