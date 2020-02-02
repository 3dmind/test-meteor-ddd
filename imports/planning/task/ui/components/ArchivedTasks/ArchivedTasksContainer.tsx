import { useTracker } from 'meteor/react-meteor-data';
import * as React from 'react';
import { TaskUiService } from '../../services';
import { ArchivedTasksList } from './ArchivedTasksList';

interface ContainerProps {
  isLoading: boolean;
}

export const ArchivedTasksContainer: React.FunctionComponent<ContainerProps> = (
  props,
) => {
  const { isLoading } = props;
  const archivedTasks = useTracker(function fetch() {
    return TaskUiService.getAllArchivedTasks();
  }, []);

  if (isLoading) {
    return null;
  }

  return <ArchivedTasksList archivedTasks={archivedTasks} />;
};
