import { TaskUiModel } from '../../ui/TaskUiModel'
import { EditTaskDto } from '../EditTaskDto'

describe('EditTaskDto', () => {
  test('create DTO from Task', () => {
    const text = 'Lorem ipsum dolor amet sum'
    const task: TaskUiModel = {
      taskId: 'A',
      isTickedOff: false,
      description: 'Lorem ipsum',
    }

    const dto = new EditTaskDto(task, text)

    expect(dto.taskId).toEqual(task.taskId)
    expect(dto.newText).toEqual(text)
  })
})
