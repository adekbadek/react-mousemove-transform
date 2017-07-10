import { mapRange, getDisplayName } from '../src/utils/helpers'

describe('mapRange', () => {
  test('mapRange', () => {
    expect(mapRange(50, 0, 100, 100, 200)).toEqual(150)
  })
})

describe('getDisplayName', () => {
  let name
  beforeEach(() => {
    name = 'TestName'
  })
  test('with .displayName', () => {
    expect(getDisplayName({displayName: name})).toEqual(name)
  })
  test('with .name', () => {
    expect(getDisplayName({name: name})).toEqual(name)
  })
  test('with nothing', () => {
    expect(getDisplayName({})).toEqual('Component')
  })
})
