import { Chip } from '@material-ui/core'
import CheckCircle from '@material-ui/icons/CheckCircle'
import * as React from 'react'

interface TickedOffAtProps {
  dateFormatted: string
}

export const TickedOffAt: React.FunctionComponent<TickedOffAtProps> = (
  props,
) => {
  const { dateFormatted } = props
  return <Chip label={dateFormatted} icon={<CheckCircle />} size={'small'} />
}
