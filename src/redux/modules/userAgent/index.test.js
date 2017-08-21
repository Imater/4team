import userAgent from './index.js'

describe('@reducer userAgent', () => {
  it('should return initialState', () => {
    expect(userAgent()).toBe('')
  })

  it('should return state on any action', () => {
    expect(userAgent('someUserAgent')).toBe('someUserAgent')

    expect(userAgent('someUserAgent'), {
      type: 'SOME_ACTION_TYPE',
      payload: {}
    }).toBe('someUserAgent')
  })
})
