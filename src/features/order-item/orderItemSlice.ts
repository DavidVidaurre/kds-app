import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type OrderItemInterface } from '../../interfaces/orderInterface'

interface OrderItemState {
  orderItems: OrderItemInterface[]
}

const initialState: OrderItemState = {
  orderItems: []
}

const orderItemSlice = createSlice({
  name: 'orderItem',
  initialState,
  reducers: {
    addOrderItem (state, action: PayloadAction<OrderItemInterface>) {
      const orderItem = state.orderItems.find((orderItem) => orderItem.itemId === action.payload.itemId)
      if (orderItem != null) {
        orderItem.quantity += action.payload.quantity
        return
      }
      state.orderItems = [...state.orderItems, action.payload]
    },
    removeOrderItem (state, action: PayloadAction<string>) {
      state.orderItems = state.orderItems.filter((orderItem) => orderItem.id !== action.payload)
    },
    updateQuantity (state, action: PayloadAction<{ orderItemId: string, actionQuantity: string }>) {
      const { orderItemId, actionQuantity } = action.payload

      const orderItem = state.orderItems.find((orderItem) => orderItem.id === orderItemId)
      if (orderItem != null) {
        if (actionQuantity === 'increment') {
          orderItem.quantity += 1
        } else {
          if (orderItem.quantity !== 1) {
            orderItem.quantity -= 1
          }
        }
      }
    },
    resetOrderItems (state) {
      state.orderItems = []
    },
    updateOrderId (state, action: PayloadAction<string>) {
      state.orderItems.forEach((orderItem) => {
        orderItem.orderId = action.payload
      })
    },
    toggleOrderItemStatus (state, action: PayloadAction<{ orderItemId: string }>) {
      const { orderItemId } = action.payload

      const orderItem = state.orderItems.find((orderItem) => orderItem.id === orderItemId)
      if (orderItem != null) {
        orderItem.isCompleted = !orderItem.isCompleted
      }
    }
  }
})

export default orderItemSlice.reducer
export const { addOrderItem, removeOrderItem, updateQuantity, resetOrderItems, toggleOrderItemStatus, updateOrderId } = orderItemSlice.actions
