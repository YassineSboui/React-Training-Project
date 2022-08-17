import { configureStore } from '@reduxjs/toolkit'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers.js'
import { batchedSubscribe } from 'redux-batched-subscribe'
import _debounce from 'lodash/debounce'

const reducer = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
}
const initialState = {}
const debounceNotify = _debounce((notify) => notify())

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
  initialState,
  enhancers: [batchedSubscribe(debounceNotify)],
})

export default store
