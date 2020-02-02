import * as React from 'react';
import * as actions from '../actions';
import { ActionsContext } from './TaskActions';
import { TaskContainer } from './TaskContainer';

export const TaskController: React.FunctionComponent = () => (
  <ActionsContext.Provider value={actions}>
    <TaskContainer />
  </ActionsContext.Provider>
);
