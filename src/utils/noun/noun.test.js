import noun from './index'

const text = ['a', 'b', 'c']

describe('@utils formatAmount', () => {
  it('should not throw on empty arguments', () => {
    expect(noun).not.toThrowError()
  })

  it('should correct detect noun', () => {
    expect(noun(1, text)).toBe('a')

    expect(noun(4, text)).toBe('b')
    expect(noun(8, text)).toBe('c')
    expect(noun(15, text)).toBe('c')
    expect(noun(16, text)).toBe('c')
    expect(noun(23, text)).toBe('b')
    expect(noun(42, text)).toBe('b')
  })
})
