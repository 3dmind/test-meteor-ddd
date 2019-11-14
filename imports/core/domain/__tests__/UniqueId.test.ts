import { UniqueId } from '../UniqueId'

describe('UniqueId', () => {
  test('#create', () => {
    const validId = 'TGRptMMy2iZoYchh7'

    const uniqueId = UniqueId.create(validId)

    expect(uniqueId).toBeDefined()
  })

  test('#value', () => {
    const validId = 'TGRptMMy2iZoYchh7'

    const uniqueId = UniqueId.create(validId)

    expect(uniqueId.value).toBe(validId)
  })
})
