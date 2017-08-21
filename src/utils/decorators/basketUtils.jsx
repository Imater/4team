import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import pureRender from 'pure-render-decorator'
import R from 'ramda'
import hoistStatics from 'hoist-non-react-statics'
import {
  getItemById,
  getSectionItemCountById,
  getLoyaltySectionItemCountById,
  selectItems,
  unselectItems,
  switchItemInGroup,
  getLoadByGroupAndId
} from 'redux/modules/productList'
import { getItemById as getItemByIdNew, getItemCountById, setChecked } from 'redux/modules/products'
import { setTarget, deleteTarget } from 'redux/modules/loyalty'
import { downloadBasket, downloadProducts } from 'redux/modules/sender'

const emptyObject = {}

export default WrappedComponent => {
  @connect(
    ({
      products,
      productList,
      loyalty,
      bookmarks
    }, {
      isLoyalty,
      isBookmark
    }) => {
      let basketKey = isLoyalty ? 'loyaltyBasket' : 'basket'
      basketKey = isBookmark ? 'bookmarkBasket' : basketKey
      return {
        products,
        productList,
        itemsUpdating: R.pathOr(emptyObject, ['loadById', basketKey], productList),
        targetId: R.pathOr(undefined, ['target', 'item', 'ID'], loyalty),
        addingToTarget: R.pathOr(emptyObject, ['target', 'isLoading'], loyalty),
        bookmarks
      }
    }
  )
  @pureRender
  class BasketUtils extends React.Component {
    static displayName = `BasketUtils(${WrappedComponent.displayName || WrappedComponent.name})`;

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      id: PropTypes.string,
      targetId: PropTypes.string,
      type: PropTypes.string,
      productList: PropTypes.object,
      products: PropTypes.object,
      items: PropTypes.array,
      itemsAll: PropTypes.array,
      checked: PropTypes.bool,
      selectedItemMap: PropTypes.object,
      bookmark: PropTypes.number,
      isLoyalty: PropTypes.bool,
      isBasket: PropTypes.bool,
      isBookmark: PropTypes.bool,
      bookmarks: PropTypes.object,
      itemsUpdating: PropTypes.object,
      addingToTarget: PropTypes.bool,
      amount: PropTypes.number,
      isNewApi: PropTypes.bool
    }

    static defaultProps = {
      type: 'section',
      bookmark: 0,
      isBookmark: false
    }

    componentWillUnmount() {
      clearTimeout(this.toBasketTimeout)
      clearTimeout(this.toDelayTimeout)
    }

    switchItemInGroup = options => this.props.dispatch(switchItemInGroup({ ...options }))

    pushTo(itemsObj, type, id, params) {
      const items = [].concat(itemsObj)
      const products = items.reduce((acc, { item, amount }) => ({
        ...acc,
        [item.ID]: amount
      }), {})

      return this.switchItemInGroup({
        id,
        type,
        items: products,
        params
      })
    }

    setTarget = (id, count) => {
      this.props.dispatch(setTarget({ id, count }))
    }

    deleteTarget = () => {
      this.props.dispatch(deleteTarget())
    }

    getFormattedItems = items => {
      const { isLoyalty, isNewApi } = this.props
      const store = isNewApi ? this.props.products : this.props.productList
      const getItem = isNewApi ? getItemByIdNew : getItemById
      return items.map(itemId => {
        const item = getItem(itemId, store)
        let amount
        if (isNewApi) {
          amount = getItemCountById(itemId, store)
        } else {
          amount = isLoyalty ?
            getLoyaltySectionItemCountById(itemId, this.props.productList)
            : getSectionItemCountById(itemId, this.props.productList)
        }
        /* let nowInBasket = type === 'bookmarkBasket' ? parseInt(R.path(['BASKET'], item) || 0, 10) : parseInt(R.prop('BASKET', item) || 0, 10)

        if (isNaN(nowInBasket)) {
          nowInBasket = 0
        } */
        return {
          item,
          amount
        }
      })
    }
    pushToBasket = (...args) => {
      const items = typeof args[0] === 'string' ? args : [this.props.id]
      const { isLoyalty } = this.props
      if (!items[0]) {
        return
      }
      const type = isLoyalty ? 'loyaltyBasket' : 'basket'

      this.pushTo(this.getFormattedItems(items), type, 0).then(() => {
        if (typeof args[0] === 'string') {
          this.unselectAll()
        }
      })
    };

    pushToBookmark = (...args) => {
      const { bookmark } = this.props
      const items = typeof args[0] === 'string' ? args : [this.props.id]
      const type = 'bookmarkBasket'
      if (!items[0]) {
        return
      }

      this.pushTo(this.getFormattedItems(items, type), type, bookmark).then(() => {
        if (typeof args[0] === 'string') {
          this.unselectAll()
        }
      })
    };

    pushToDelay = (...args) => {
      const items = typeof args[0] === 'string' ? args : [this.props.id]
      const { isNewApi } = this.props
      const store = isNewApi ? this.props.products : this.props.productList
      const getItem = isNewApi ? getItemByIdNew : getItemById

      const formattedItems = items.map(itemId => ({
        item: getItem(itemId, store),
        amount: 1 // getSectionItemCountById(itemId, productList)
      }))

      this.pushTo(formattedItems, 'waitList', 0)
    };

    pushToFavorite = (...args) => {
      const items = typeof args[0] === 'string' ? args : [this.props.id]
      const { isNewApi } = this.props
      const store = isNewApi ? this.props.products : this.props.productList
      const getItem = isNewApi ? getItemByIdNew : getItemById
      const formattedItems = items.map(itemId => ({
        item: getItem(itemId, store),
        amount: 1
      }))

      this.pushTo(formattedItems, 'favorite', 0)
    };

    pushToCompare = (...args) => {
      const items = typeof args[0] === 'string' ? args : [this.props.id]
      const { isNewApi } = this.props
      const store = isNewApi ? this.props.products : this.props.productList
      const getItem = isNewApi ? getItemByIdNew : getItemById
      const formattedItems = items.map(itemId => ({
        item: getItem(itemId, store),
        amount: 1
      }))

      this.pushTo(formattedItems, 'compare', 0)
    };

    removeFromBasket = () => {
      const { isLoyalty, selectedItemMap, dispatch } = this.props
      const productsList = this.props.id ? [this.props.id] : Object.keys(selectedItemMap)

      if (productsList.length === 0) {
        return
      }
      const type = isLoyalty ? 'loyaltyBasket' : 'basket'
      const items = productsList.reduce((acc, id) => ({ ...acc, [id]: false }), {})

      this.switchItemInGroup({
        id: 0,
        type,
        items
      })

      dispatch(unselectItems({
        type
      }))
      this.unselectAll()
    }

    removeFromBookmark = () => {
      const { selectedItemMap, dispatch, bookmark } = this.props
      const productsList = this.props.id ? [this.props.id] : Object.keys(selectedItemMap)

      if (productsList.length === 0) {
        return
      }
      const type = 'bookmarkBasket'
      const items = productsList.reduce((acc, id) => ({ ...acc, [id]: false }), {})

      this.switchItemInGroup({
        id: bookmark,
        type,
        items
      })

      dispatch(unselectItems({
        type
      }))
      this.unselectAll()
    }

    removeFromDelay = (...args) => {
      const productsList = typeof args[0] === 'string' ? args : [this.props.id]
      this.switchItemInGroup({
        id: 0,
        type: 'waitList',
        items: productsList.reduce((acc, id) => ({
          ...acc,
          [id]: false
        }), {})
      })
      this.unselectAll()
    };

    removeFromFavorite = (...args) => {
      const productsList = typeof args[0] === 'string' ? args : [this.props.id]
      this.switchItemInGroup({
        id: 0,
        type: 'favorite',
        items: productsList.reduce((acc, id) => ({
          ...acc,
          [id]: false
        }), {})
      })
      this.unselectAll()
    };

    removeFromCompare = (...args) => {
      const productsList = typeof args[0] === 'string' ? args : [this.props.id]
      this.switchItemInGroup({
        id: 0,
        type: 'compare',
        items: productsList.reduce((acc, id) => ({
          ...acc,
          [id]: false
        }), {})
      })
      this.unselectAll()
    };

    moveToBookmark = () => {
      const { selectedItemMap, bookmarks } = this.props
      const productsList = this.props.id ? [this.props.id] : Object.keys(selectedItemMap)
      if (productsList.length === 0) {
        return
      }
      const bookmark = R.head(R.keys(bookmarks.bookmarks))

      this.pushTo(this.getFormattedItems(productsList), 'bookmarkBasket', bookmark, { from: 'basket', to: bookmark }).then(() => {
        this.unselectAll()
      })
    };

    moveToBasket = () => {
      const { selectedItemMap, bookmark } = this.props
      const productsList = this.props.id ? [this.props.id] : Object.keys(selectedItemMap)
      if (productsList.length === 0) {
        return
      }
      this.pushTo(this.getFormattedItems(productsList), 'basket', bookmark, { from: bookmark, to: 'basket' })
    };

    downloadExcelBasket = data => {
      const { dispatch } = this.props
      dispatch(downloadBasket(data))
      this.unselectAll()
    };

    downloadExcel = (...args) => {
      const { dispatch } = this.props
      const productsList = typeof args[0] === 'string' ? args : [this.props.id]
      const params = productsList.map(item => `filter[products][]=${item}`).join('&')
      dispatch(downloadProducts(params))
      this.unselectAll()
    };

    unselectAll = () => {
      const { dispatch, type, productList, isNewApi } = this.props
      const products = productList.selectedItemsMap[type]

      const action = isNewApi ? setChecked : unselectItems
      const params = isNewApi ? false : { type, products }

      dispatch(action(params))
    }

    handleCheckAllItems = checked => {
      const { dispatch, items, type } = this.props
      const products = items.reduce((acc, item) => {
        acc[item.ID] = checked

        return acc
      }, {})

      const action = checked ? selectItems : unselectItems

      dispatch(action({
        type,
        products
      }))
    };

    handleCheckAllExpandingItems = checked => {
      const { dispatch, items, itemsAll, type } = this.props
      let products = {}
      if (checked) {
        products = items.reduce((acc, item) => {
          acc[item.ID] = checked

          return acc
        }, {})
      } else {
        products = itemsAll.reduce((acc, item) => {
          acc[item.ID] = checked

          return acc
        }, {})
      }

      const action = checked ? selectItems : unselectItems

      dispatch(action({
        type,
        products
      }))
    };

    render() {
      const loyaltyBasket = getLoadByGroupAndId('loyaltyBasket', this.props.id, this.props.productList)
      const bookmarkBasket = getLoadByGroupAndId('bookmarkBasket', this.props.id, this.props.productList)
      const waitList = getLoadByGroupAndId('waitList', this.props.id, this.props.productList)
      const favorite = getLoadByGroupAndId('favorite', this.props.id, this.props.productList)
      const compare = getLoadByGroupAndId('compare', this.props.id, this.props.productList)
      const item = getItemById(this.props.id, this.props.productList)

      let placingKey = this.props.isLoyalty ? 'isPlacingLoyaltyBasket' : 'isPlacingBasket'
      placingKey = this.props.isBookmark ? 'isPlacingBookmarkBasket' : placingKey
      const isUpdating = (this.props.itemsUpdating[this.props.id] || {})[placingKey]

      return (
        <WrappedComponent
          {...this.props}
          pushToBasket={this.pushToBasket}
          pushToDelay={this.pushToDelay}
          pushToFavorite={this.pushToFavorite}
          pushToCompare={this.pushToCompare}
          pushToBookmark={this.pushToBookmark}
          removeFromDelay={this.removeFromDelay}
          removeFromBasket={this.removeFromBasket}
          removeFromBookmark={this.removeFromBookmark}
          moveToBookmark={this.moveToBookmark}
          moveToBasket={this.moveToBasket}
          removeFromFavorite={this.removeFromFavorite}
          removeFromCompare={this.removeFromCompare}
          downloadExcel={this.downloadExcel}
          downloadExcelBasket={this.downloadExcelBasket}
          onCheckAllItems={this.handleCheckAllItems}
          onCheckAllExpandingItems={this.handleCheckAllExpandingItems}
          switchItemInGroup={this.switchItemInGroup}
          setTarget={this.setTarget}
          deleteTarget={this.deleteTarget}
          inBasket={isUpdating}
          inBookmark={isUpdating}
          inLoyaltyBasket={loyaltyBasket.isPlacingLoyaltyBasket}
          inBookmarkBasket={bookmarkBasket.isPlacingBookmarkBasket}
          inDelay={item.DELAY === 'Y' ? waitList.isRemovingWaitList : waitList.isPlacingWaitList}
          inFavorite={item.FAVORITE === 'Y' ? favorite.isRemovingFavorite : favorite.isPlacingFavorite}
          inCompare={item.COMPARE === 'Y' ? compare.isRemovingCompare : compare.isPlacingCompare}
          checked={this.props.checked}
          isUpdating={isUpdating}
          isTarget={this.props.targetId === this.props.id}
          isAddingToTarget={this.props.addingToTarget}
        />
      )
    }
  }

  return hoistStatics(BasketUtils, WrappedComponent)
}
