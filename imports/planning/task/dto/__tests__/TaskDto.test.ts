import { TaskUiModel } from '../../ui/TaskUiModel'
import { TaskDto } from '../TaskDto'

describe('TaskDto', () => {
  test('create DTO from Task', () => {
    const task: TaskUiModel = {
      id: 'A',
      isTickedOff: false,
      description: 'Lorem ipsum',
    }

    const dto = new TaskDto(task)

    expect(dto.taskId).toEqual(task.id)
  })
})
