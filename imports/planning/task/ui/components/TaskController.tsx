import * as React from 'react'
import * as actions from '../actions'
import { ActiveTasksListContainer } from './ActiveTasks/ActiveTasksListContainer'
import { ArchivedTasksListContainer } from './ArchivedTasks/ArchivedTasksListContainer'
import { ActionsContext } from './TaskActions'
import { NoteTask } from './NoteTask'

export const TaskController: React.FunctionComponent = () => (
  <ActionsContext.Provider value={actions}>
    <NoteTask />
    <ActiveTasksListContainer />
    <ArchivedTasksListContainer />
  </ActionsContext.Provider>
)
