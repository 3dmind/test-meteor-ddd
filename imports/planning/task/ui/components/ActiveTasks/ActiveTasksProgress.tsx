import { LinearProgress } from '@material-ui/core';
import * as React from 'react';

interface ActiveTasksProgressProps {
  value: number;
}

export const ActiveTasksProgress: React.FunctionComponent<
  ActiveTasksProgressProps
> = (props) => {
  const { value } = props;
  return (
    <LinearProgress variant={'determinate'} color={'primary'} value={value} />
  );
};
