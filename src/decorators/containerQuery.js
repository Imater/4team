import { applyContainerQuery } from 'react-container-query'
import R from 'ramda'

const getWidth = R.compose(
  Number,
  R.propOr(undefined, 1),
)

export default ({ styles }, query = {}) => component => {
  const calculatedQuery = R.compose(
    R.merge(query),
    R.reduce((acc, item) => ({
      ...acc,
      [item]: {
        minWidth: getWidth(item.match(/gt_(\d+)/)) + 1,
        maxWidth: getWidth(item.match(/lt_(\d+)/)) - 1
      }
    }), {}),
    R.filter(key => R.contains('width_gt', key) || R.contains('width_lt', key)),
    R.keys,
  )(styles)
  return applyContainerQuery(component, calculatedQuery)
}
