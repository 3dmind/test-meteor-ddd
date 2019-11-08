import * as React from 'react'
import { TaskPresenter } from '../../presenter'
import { CreatedAt, TickedOffAt } from '../common'

interface ActiveTaskMetadataProps {
  task: TaskPresenter
}

export const ActiveTaskMetadata: React.FunctionComponent<
  ActiveTaskMetadataProps
> = (props) => {
  const { createdAtFormatted, tickedOffAtFormatted, isTickedOff } = props.task
  if (isTickedOff) {
    return <TickedOffAt dateFormatted={tickedOffAtFormatted} />
  } else {
    return <CreatedAt dateFormatted={createdAtFormatted} />
  }
}
