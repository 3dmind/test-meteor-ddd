import * as React from 'react'
import * as actions from './actions'
import { ActiveTasksListContainer } from './ActiveTasks/ActiveTasksListContainer'
import { ArchivedTasksListContainer } from './ArchivedTasks/ArchivedTasksListContainer'
import { ActionsContext } from './TaskActions'
import { TaskForm } from './TaskForm'

export const TaskController: React.FunctionComponent = () => (
  <ActionsContext.Provider value={actions}>
    <TaskForm />
    <ActiveTasksListContainer />
    <ArchivedTasksListContainer />
  </ActionsContext.Provider>
)
