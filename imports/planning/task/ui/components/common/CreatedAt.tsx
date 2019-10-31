import { Chip } from '@material-ui/core'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import * as React from 'react'

interface CreatedAtProps {
  dateFormatted: string
}

export const CreatedAt: React.FunctionComponent<CreatedAtProps> = (props) => {
  const { dateFormatted } = props
  return (
    <Chip label={dateFormatted} icon={<CheckCircleOutline />} size={'small'} />
  )
}
