import * as React from 'react'
import { TaskController } from '../planning/task/ui/components/TaskController'
import { ApplicationContent } from './ApplicationContent'
import { ApplicationHeader } from './ApplicationHeader'

export const Application: React.FunctionComponent = () => (
  <>
    <ApplicationHeader />
    <ApplicationContent>
      <TaskController />
    </ApplicationContent>
  </>
)
