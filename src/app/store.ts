import { configureStore } from '@reduxjs/toolkit'
import orderReducer from '../features/order/orderSlice'
import orderItemReducer from '../features/order-item/orderItemSlice'
import filterReducer from '../features/filter/filterSlice'

const store = configureStore({
  reducer: {
    order: orderReducer,
    orderItem: orderItemReducer,
    filter: filterReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export default store
