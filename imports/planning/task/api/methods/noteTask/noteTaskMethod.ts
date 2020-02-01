import { Meteor } from 'meteor/meteor';
import { GenericAppErrors } from '../../../../../core/logic';
import { ApiErrors } from '../../api-errors';
import { NoteTaskDto, noteTaskUseCase } from '../../use-cases';
import { NoteTaskMethodName } from './NoteTaskMethodName';

Meteor.methods({
  [NoteTaskMethodName]: function noteTaskMethod(dto: NoteTaskDto): void {
    const { userId } = this;

    if (!userId) {
      throw new ApiErrors.Unauthorized();
    }

    const response = noteTaskUseCase.execute({
      dto,
      userId,
    });
    if (response.isLeft()) {
      const { result } = response;
      if (result instanceof GenericAppErrors.UnexpectedError) {
        throw new ApiErrors.InternalServerError(result.error.message);
      } else {
        throw new ApiErrors.BadRequest(result.error);
      }
    }
  },
});
