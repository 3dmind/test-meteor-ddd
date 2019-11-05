import * as React from 'react'
import { TaskViewModel } from '../../models'
import { CreatedAt, TickedOffAt } from '../common'

interface ActiveTaskMetadataProps {
  task: TaskViewModel
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
