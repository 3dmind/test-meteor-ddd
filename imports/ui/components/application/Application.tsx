import * as React from 'react'
import { TaskController } from '../../../planning/task/ui'
import { ApplicationPresenter } from '../../presenter'
import { ApplicationContent } from './ApplicationContent'
import { ApplicationHeader } from './ApplicationHeader'

interface ApplicationProps {
  application: ApplicationPresenter
}

export const Application: React.FunctionComponent<ApplicationProps> = (
  props,
) => {
  const { application } = props
  return (
    <>
      <ApplicationHeader isAuthenticated={application.isAuthenticated()} />
      <ApplicationContent>
        <TaskController />
      </ApplicationContent>
    </>
  )
}
