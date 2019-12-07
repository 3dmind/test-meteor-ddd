import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { TaskController } from '../../planning/task/ui'
import { ApplicationPresenter } from '../presenter'
import { AccountSignIn } from './Account'
import { ApplicationContent, ApplicationHeader } from './ApplicationBar'
import { ChangePassword } from './ChangePassword'
import { SignUp } from './SignUp'

interface ApplicationProps {
  application: ApplicationPresenter
}

export const Application: React.FunctionComponent<ApplicationProps> = (
  props,
) => {
  const { application } = props
  return (
    <>
      <ApplicationHeader
        isAuthenticated={application.isAuthenticated()}
        username={application.username}
      />
      <Switch>
        <Route exact path={'/'}>
          {application.isAuthenticated() ? (
            <ApplicationContent>
              <TaskController />
            </ApplicationContent>
          ) : (
            <AccountSignIn />
          )}
        </Route>
        <Route path={'/signin'}>
          <AccountSignIn />
        </Route>
        <Route path={'/signup'}>
          <SignUp />
        </Route>
        <Route path={'/changepassword'}>
          <ChangePassword />
        </Route>
      </Switch>
    </>
  )
}
