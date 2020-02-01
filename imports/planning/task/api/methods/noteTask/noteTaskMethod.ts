import { Meteor } from 'meteor/meteor';
import { GenericAppErrors } from '../../../../../core/logic';
import { UnauthorizedMethodCallException } from '../../exceptions';
import { NoteTaskDto, noteTaskUseCase } from '../../use-cases/note-task';
import { NoteTaskMethodName } from './NoteTaskMethodName';

Meteor.methods({
  [NoteTaskMethodName]: function noteTaskMethod(dto: NoteTaskDto): void {
    const { userId } = this;

    if (!userId) {
      throw new UnauthorizedMethodCallException();
    }

    const response = noteTaskUseCase.execute({
      dto,
      userId,
    });
    if (response.isLeft()) {
      const { result } = response;
      if (result instanceof GenericAppErrors.UnexpectedError) {
        throw new Meteor.Error(
          500,
          'Internal server error',
          result.error.message,
        );
      } else {
        throw new Meteor.Error(400, 'Bad request', result.error);
      }
    }
  },
});
