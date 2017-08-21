import R from 'ramda'

export const isNewNoShowCount = R.compose(
  R.contains(R.__, ['N']),
  R.prop('UP_MARK')
)

export const isNew = R.either(
  R.compose(
    R.contains(R.__, ['N', 'H', 'Н']),
    R.prop('UP_MARK')
  ),
  R.pathOr(false, ['MARKS', 'NOVELTY'])
)

// первая P латиницей, вторая кириллицей
export const isSale = R.either(
  R.pathOr(false, ['MARKS', 'SALE']),
  R.compose(
    R.contains(R.__, ['R', 'P', 'Р']),
    R.prop('UP_MARK')
  )
)

export const isHot = R.either(
  R.pathOr(false, ['MARKS', 'HOT_PRODUCTS']),
  R.compose(
    R.contains(R.__, ['Y']),
    R.prop('UP_HOT_PRODUCTS')
  )
)

export const isInBookmark = R.compose(
  R.gt(R.__, 0),
  R.length,
  R.values,
  R.prop('UP_BOOKMARK')
)

export const isSymbol = R.either(
  R.pathOr(false, ['MARKS', 'SYMBOL_OF_YEAR']),
  R.compose(
    R.contains(R.__, ['Y']),
    R.prop('upSymbolOfYear')
  )
)

export const isInStock = R.compose(
  R.gt(R.__, 0),
  R.prop('REMAIN')
)
