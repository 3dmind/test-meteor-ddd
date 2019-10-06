import { NoteTaskDto } from '../NoteTaskDto'

describe('NoteTaskDto', () => {
  test('create DTO from Task', () => {
    const text = 'Lorem ipsum'

    const dto = new NoteTaskDto(text)

    expect(dto.text).toEqual(text)
  })
})
