import * as Ramda from 'ramda'
import { ApplicationPresenter } from '../presenter'
import { Meteor } from 'meteor/meteor'

const userIdLens = Ramda.lensProp('_id')
const usernameLens = Ramda.lensProp('username')
const getUserId = Ramda.view<Meteor.User, string>(userIdLens)
const getUsername = Ramda.view<Meteor.User, string>(usernameLens)

export const ApplicationPresenterMapper = {
  toPresentation(user: Meteor.User): ApplicationPresenter {
    return ApplicationPresenter.create({
      userId: getUserId(user),
      username: getUsername(user),
    })
  },
}
Object.freeze(ApplicationPresenterMapper)
