import userAgent from './index.js'

describe('@reducer userAgent', () => {
  it('should return initialState', () => {
    expect(userAgent()).toBe('')
  })
})
