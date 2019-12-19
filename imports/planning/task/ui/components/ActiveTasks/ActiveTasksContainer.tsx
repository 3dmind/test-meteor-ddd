import { useTracker } from 'meteor/react-meteor-data'
import * as React from 'react'
import { TaskUiService } from '../../services'
import { ActiveTasksList } from './ActiveTasksList'

export const ActiveTasksContainer: React.FunctionComponent = () => {
  const activeTasks = useTracker(function fetch() {
    return TaskUiService.getAllActiveTasks()
  }, [])

  return <ActiveTasksList activeTasks={activeTasks} />
}
