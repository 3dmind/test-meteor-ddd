import * as React from 'react'
import * as actions from '../actions'
import { ActiveTasksContainer } from './ActiveTasks'
import { ArchivedTasksContainer } from './ArchivedTasks'
import { NoteTask } from './NoteTask'
import { ActionsContext } from './TaskActions'

export const TaskController: React.FunctionComponent = () => (
  <ActionsContext.Provider value={actions}>
    <NoteTask />
    <ActiveTasksContainer />
    <ArchivedTasksContainer />
  </ActionsContext.Provider>
)
