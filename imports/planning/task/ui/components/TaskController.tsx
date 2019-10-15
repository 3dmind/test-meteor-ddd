import * as React from 'react'
import * as actions from '../actions'
import { ActiveTasksContainer } from './ActiveTasks'
import { ArchivedTasksContainer } from './ArchivedTasks'
import { ActionsContext } from './TaskActions'
import { NoteTask } from './NoteTask'

export const TaskController: React.FunctionComponent = () => (
  <ActionsContext.Provider value={actions}>
    <NoteTask />
    <ActiveTasksContainer />
    <ArchivedTasksContainer />
  </ActionsContext.Provider>
)
