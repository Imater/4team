import R from 'ramda'

const productsParams = ['q', 'p', 'section', 'filters']
const omitProductsParams = R.omit(productsParams)

const routerHistory = {
  stringifyQuery(query) {
    const products = productsParams.filter(key => query[key]).map(key => `${key}=${query[key]}`)
    const others = R.keys(omitProductsParams(query)).map(key => `${key}=${query[key]}`)
    return [...products, ...others].join('&')
  }
}

export default routerHistory
