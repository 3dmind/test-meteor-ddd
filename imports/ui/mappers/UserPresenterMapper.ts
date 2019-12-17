import { Meteor } from 'meteor/meteor'
import * as Ramda from 'ramda'
import { UserPresenter } from '../presenter'

const userIdLens = Ramda.lensProp('_id')
const usernameLens = Ramda.lensProp('username')
const getUserId = Ramda.view<Meteor.User, string>(userIdLens)
const getUsername = Ramda.view<Meteor.User, string>(usernameLens)

export const UserPresenterMapper = {
  toPresentation(user: Meteor.User): UserPresenter {
    return UserPresenter.create({
      userId: getUserId(user),
      username: getUsername(user),
    })
  },
}
Object.freeze(UserPresenterMapper)
