import { configureStore } from '@reduxjs/toolkit'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'
import { batchedSubscribe } from 'redux-batched-subscribe'
import _debounce from 'lodash/debounce'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'

const reducer = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegiser: userRegisterReducer,
}

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const preloadedState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
}
const debounceNotify = _debounce((notify) => notify())

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [batchedSubscribe(debounceNotify)],
})

export default store
