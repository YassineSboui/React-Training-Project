import { configureStore } from '@reduxjs/toolkit'
import { productListReducer } from './reducers/productReducers.js'
import { batchedSubscribe } from 'redux-batched-subscribe'
import _debounce from 'lodash/debounce'
import logger from 'redux-logger'

const reducer = {
  productList: productListReducer,
}
const initialState = {}
const debounceNotify = _debounce((notify) => notify())

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  initialState,
  enhancers: [batchedSubscribe(debounceNotify)],
})

export default store
