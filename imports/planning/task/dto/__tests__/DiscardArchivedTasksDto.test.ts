import { TaskUiModel } from '../../ui/TaskUiModel'
import { DiscardArchivedTasksDto } from '../DiscardArchivedTasksDto'

describe('DiscardArchivedTasksDto', () => {
  test('create DTO from Task', () => {
    const tasks: TaskUiModel[] = [
      {
        id: 'A',
        isTickedOff: false,
        description: 'Foo',
      },
      {
        id: 'B',
        isTickedOff: false,
        description: 'bar',
      },
    ]

    const dto = new DiscardArchivedTasksDto(tasks)

    expect(dto.taskIdList).toEqual(['A', 'B'])
  })
})
