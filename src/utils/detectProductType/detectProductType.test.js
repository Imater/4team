import {
  isNew,
  isSale,
  isHot,
  isSymbol,
  isInStock,
  isInBookmark
} from './index'

describe('@utils detectProductType', () => {
  describe('isNew', () => {
    it('should have not throw on empty arguments', () => {
      expect(isNew()).toEqual(false)
    })

    it('should have not throw on empty product', () => {
      expect(isNew({})).toBe(false)
    })

    it('should return true with N-mark', () => {
      expect(isNew({ UP_MARK: 'N' })).toBe(true)
    })

    it('should return true with H-mark', () => {
      expect(isNew({ UP_MARK: 'H' })).toBe(true)
    })

    it('should return false with other mark', () => {
      expect(isNew({ UP_MARK: 'Q' })).toBe(false)
      expect(isNew({ UP_MARK: 'W' })).toBe(false)
    })
  })

  describe('isSale', () => {
    it('should have not throw on empty arguments', () => {
      expect(isSale()).toBe(false)
    })

    it('should have not throw on empty product', () => {
      expect(isSale({})).toBe(false)
    })

    it('should return true with P-mark', () => {
      expect(isSale({ UP_MARK: 'P' })).toBe(true)
    })

    it('should return true with Р-mark', () => {
      expect(isSale({ UP_MARK: 'Р' })).toBe(true)
    })

    it('should return true with R-mark', () => {
      expect(isSale({ UP_MARK: 'R' })).toBe(true)
    })

    it('should return false with other mark', () => {
      expect(isSale({ UP_MARK: 'Q' })).toBe(false)
      expect(isSale({ UP_MARK: 'W' })).toBe(false)
    })
  })

  describe('isHot', () => {
    it('should have not throw on empty arguments', () => {
      expect(isHot()).toBe(false)
    })

    it('should have not throw on empty product', () => {
      expect(isHot({})).toBe(false)
    })

    it('should return true with Y', () => {
      expect(isHot({ UP_HOT_PRODUCTS: 'Y' })).toBe(true)
    })

    it('should return false with N', () => {
      expect(isNew({ UP_HOT_PRODUCTS: 'N' })).toBe(false)
    })
  })

  describe('isSymbol', () => {
    it('should have not throw on empty arguments', () => {
      expect(isSymbol()).toBe(false)
    })

    it('should have not throw on empty product', () => {
      expect(isSymbol({})).toBe(false)
    })

    it('should return true with correct', () => {
      expect(isSymbol({ upSymbolOfYear: 'Y' })).toBe(true)
    })

    it('should return false with N', () => {
      expect(isSymbol({ upSymbolOfYear: 'N' })).toBe(false)
    })
  })

  describe('isInStock', () => {
    it('should have not throw on empty arguments', () => {
      expect(isInStock()).toBe(false)
    })

    it('should have not throw on empty product', () => {
      expect(isInStock({})).toBe(false)
    })

    it('should return false on empty remain', () => {
      expect(isInStock({ REMAIN: '0' })).toBe(false)
    })

    it('should return true on non-empty remain', () => {
      expect(isInStock({ REMAIN: '1' })).toBe(true)
    })
  })

  describe('isInBookmark', () => {
    it('should have not throw on empty arguments', () => {
      expect(isInBookmark()).toBe(false)
    })

    it('should have not throw on empty product', () => {
      expect(isInBookmark({})).toBe(false)
    })

    it('should return true with array', () => {
      expect(isInBookmark({ UP_BOOKMARK: ['1', '3'] })).toBe(true)
    })

    it('should return true with array into 1 element', () => {
      expect(isInBookmark({ UP_BOOKMARK: ['1'] })).toBe(true)
    })

    it('should return true with empty array', () => {
      expect(isInBookmark({ UP_BOOKMARK: [] })).toBe(false)
    })

    it('should return false with other mark', () => {
      expect(isInBookmark({ UP_BOOKMARK: '1' })).toBe(false)
    })
  })
})
