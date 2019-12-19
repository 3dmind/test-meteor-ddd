import { useTracker } from 'meteor/react-meteor-data'
import * as React from 'react'
import { TaskUiService } from '../../services'
import { ArchivedTasksList } from './ArchivedTasksList'

export const ArchivedTasksContainer: React.FunctionComponent = () => {
  const archivedTasks = useTracker(function fetch() {
    return TaskUiService.getAllArchivedTasks()
  }, [])

  return <ArchivedTasksList archivedTasks={archivedTasks} />
}
