import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { TaskController } from '../../planning/task/ui'
import { UserPresenter } from '../presenter'
import { AccountChangePassword, AccountSignIn, AccountSignUp } from './Account'
import { ApplicationContent, ApplicationHeader } from './ApplicationBar'

interface ApplicationProps {
  user: UserPresenter
}

export const Application: React.FunctionComponent<ApplicationProps> = (
  props,
) => {
  const { user } = props
  return (
    <>
      <ApplicationHeader
        isAuthenticated={user.isAuthenticated()}
        username={user.username}
      />
      <Switch>
        <Route exact path={'/'}>
          {user.isAuthenticated() ? (
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
          <AccountSignUp />
        </Route>
        <Route path={'/changepassword'}>
          <AccountChangePassword />
        </Route>
      </Switch>
    </>
  )
}
