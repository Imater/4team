import React, { PropTypes } from 'react'
import { createSelector } from 'reselect'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import pureRender from 'pure-render-decorator'
import hoistStatics from 'hoist-non-react-statics'
import config from 'config'
import R from 'ramda'

import {
  getItemById,
  setItemCounts,
  selectItems,
  unselectItems,
  getItemCountByGroupAndId,
  getLoyaltyItemCountByGroupAndId,
  getSelectedItemMapByGroup
} from 'redux/modules/productList'

export default WrappedComponent => {
  @connect(
    ({
      productList,
      token,
      loyalty,
      loyaltyBasket
      // settings: { mode }
    }, ownProps) => {
      const listType = ownProps.type === 'orders' ? 'section' : ownProps.type
      const itemData = ownProps.isNewApi ? {} : {
        itemsCount: ownProps.isLoyalty ?
          getLoyaltyItemCountByGroupAndId(ownProps.type || 'section', ownProps.id, productList)
          : getItemCountByGroupAndId(listType || 'section', ownProps.id, productList),
        item: getItemById(ownProps.id, productList),
        checked: getSelectedItemMapByGroup(ownProps.type || 'section', productList)[ownProps.id]
      }

      return {
        ...itemData,
        isUserWithoutPassword: token.isUserWithoutPassword,
        balance: parseInt(R.pathOr(0, ['status', 'BALANCE'], loyalty), 10),
        loyaltyBasketSum: R.pathOr(0, ['itemsSum'], loyaltyBasket),
        hasLoyaltyAccess: R.path(['status', 'ACCESS'], loyalty) === '1'
      }
    }
  )
  @pureRender
  class Product extends React.Component {
    static displayName = `Product(${WrappedComponent.displayName || WrappedComponent.name})`;

    static propTypes = {
      id: PropTypes.string.isRequired,
      type: PropTypes.string,
      item: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired,
      itemsCount: PropTypes.number,
      productList: PropTypes.object,
      isUserWithoutPassword: PropTypes.bool,
      checked: PropTypes.bool,
      balance: PropTypes.number,
      loyaltyBasketSum: PropTypes.number,
      isLoyalty: PropTypes.bool,
      isBookmark: PropTypes.bool,
      bookmark: PropTypes.number,
      isBasket: PropTypes.bool,
      switchItemInGroup: PropTypes.func,
      pushToBookmark: PropTypes.func,
      pushToBasket: PropTypes.func,
      withError: PropTypes.bool,
      isNewApi: PropTypes.bool,
      hasLoyaltyAccess: PropTypes.bool
    }

    static defaultProps = {
      type: 'section'
    }

    componentWillMount() {
      const { isBasket, item: { BASKET }, withError, checked } = this.props
      if (!isBasket) {
        return
      }
      this.handleItemCountChange(parseInt(BASKET, 10))
      if (withError && !checked) {
        this.handleSelectItem(true)
      }
    }

    componentWillReceiveProps(nextProps) {
      const { isBasket, withError, checked } = nextProps
      if (!isBasket) {
        return
      }
      if (!this.props.withError && withError && !checked) {
        this.handleSelectItem(true)
      }
    }

    handleItemCountChange = count => {
      const { dispatch, id, type } = this.props
      const product = {
        [id]: count
      }
      return dispatch(setItemCounts({
        type,
        items: product
      }))
    };

    handleSelectItem = checked => {
      const { dispatch, id, type } = this.props
      const products = {
        [id]: checked
      }

      if (checked) {
        dispatch(selectItems({
          type,
          products
        }))
      } else {
        dispatch(unselectItems({
          type,
          products
        }))
      }
    }

    handleChangeInBasket = count => {
      const { item, type, switchItemInGroup, isBookmark, bookmark } = this.props
      const remain = this.props.isLoyalty ?
        config.loyaltyOrderMaxLimit
        : parseInt(R.path(['REMAIN'], item), 10)
      const startAmount = R.pathOr(1, ['UP_MULTIPLICITY', 'MIN'], item)
      const newCount = R.clamp(startAmount, remain, count)

      if (isBookmark && bookmark) {
        switchItemInGroup({
          id: bookmark,
          type: 'bookmarkBasket',
          items: {
            [item.ID]: newCount
          }
        })
      } else {
        switchItemInGroup({
          id: 0,
          type,
          items: {
            [item.ID]: newCount
          }
        })
      }
    }

    handleNavigateTo = url => {
      const { dispatch } = this.props
      dispatch(push(url))
    }

    handleKeyUpAmount = (event, amount) => {
      if (event.key !== 'Enter') {
        return
      }
      const { isBookmark, pushToBookmark, pushToBasket, itemsCount } = this.props
      const promise = amount === parseInt(itemsCount, 10) ? Promise.resolve(amount) : this.handleItemCountChange(amount)
      promise.then(() => {
        if (isBookmark) {
          pushToBookmark()
        } else {
          pushToBasket()
        }
      })
    }

    productPhotosSelector = createSelector(
      item => item,
      item => R.values(R.propOr({}, 'photo', item)),
      (item, values) => values.map(photo => photo && photo.PATH)
    )

    render() {
      const {
        itemsCount,
        isUserWithoutPassword,
        item,
        checked,
        balance,
        loyaltyBasketSum
      } = this.props

      const withActions = !isUserWithoutPassword && item && item.PRICE !== undefined

      let productPhotos = this.productPhotosSelector(item)
      const defaultPhoto = R.prop('DETAIL_PICTURE_PATH', item)
      if (productPhotos.length && defaultPhoto) {
        productPhotos = [defaultPhoto].concat(productPhotos)
      }

      const price = parseFloat(R.pathOr(0, ['PRICE'], item))
      const amount = parseInt(itemsCount, 10)
      const isMaxAmount = (balance - loyaltyBasketSum) < price
      const disableToLoyalty = (balance - loyaltyBasketSum) < price * itemsCount

      const propsOldApi = this.props.isNewApi ? {} : {
        onItemSelect: this.handleSelectItem,
        amount,
        onItemCountChange: this.handleItemCountChange
      }

      return (
        <WrappedComponent
          {...this.props}
          isMaxAmount={isMaxAmount}
          disableToLoyalty={disableToLoyalty}
          productPhotos={productPhotos}
          withActions={withActions}
          onNavigateTo={this.handleNavigateTo}
          onChangeInBasket={this.handleChangeInBasket}
          onKeyUpAmount={this.handleKeyUpAmount}
          checked={checked}
          {...propsOldApi}
        />
      )
    }
  }

  return hoistStatics(Product, WrappedComponent)
}
