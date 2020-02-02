import { Chip } from '@material-ui/core';
import Archive from '@material-ui/icons/Archive';
import * as React from 'react';

interface ArchivedAtProps {
  dateFormatted: string;
}

export const ArchivedAt: React.FunctionComponent<ArchivedAtProps> = (props) => {
  const { dateFormatted } = props;
  return <Chip label={dateFormatted} icon={<Archive />} size={'small'} />;
};
