import capitalizeFirstLetter from './index'

describe('@utils capitalizeFirstLetter', () => {
  it('should return empty string on empty arguments', () => {
    expect(capitalizeFirstLetter()).toBe('')
  })

  it('should return empty string on empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('')
  })

  it('should capitalize first letter', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello')
  })

  it('should return same string if first letter capitalized', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello')
  })
})
