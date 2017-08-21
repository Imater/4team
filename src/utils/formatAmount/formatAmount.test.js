import formatAmount from './index'

describe('@utils formatAmount', () => {
  it('should not throw on empty arguments', () => {
    expect(formatAmount).not.toThrowError()
  })

  it('should format integer', () => {
    expect(formatAmount(10)).toBe('10')
    expect(formatAmount(100)).toBe('100')
    expect(formatAmount(1000)).toBe('1 000')
    expect(formatAmount(10000)).toBe('10 000')
    expect(formatAmount(100000)).toBe('100 000')
    expect(formatAmount(1000000)).toBe('1 000 000')
  })

  it('should format fractional', () => {
    expect(formatAmount(0.1)).toBe('0.1')
    expect(formatAmount(0.01)).toBe('0.01')
    expect(formatAmount(0.01234)).toBe('0.01')
  })

  it('should format', () => {
    expect(formatAmount(10.1)).toBe('10.1')
    expect(formatAmount(10000.578)).toBe('10 000.57')
  })
})
