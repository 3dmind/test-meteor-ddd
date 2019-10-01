import { UniqueEntityId } from '../UniqueEntityId'

describe('UniqueEntityId', () => {
  test('#create', () => {
    const validId = 'TGRptMMy2iZoYchh7'

    const uniqueEntityId = UniqueEntityId.create(validId)

    expect(uniqueEntityId).toBeDefined()
  })

  test('#value', () => {
    const validId = 'TGRptMMy2iZoYchh7'

    const uniqueEntityId = UniqueEntityId.create(validId)

    expect(uniqueEntityId.value).toBe(validId)
  })
})
