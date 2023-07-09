import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type OrderInterface, type OrderStatus } from '../../interfaces/orderInterface'
import { orders } from '../../mocks/data.ts'

interface OrderState {
  orders: OrderInterface[]
  newTableOrder: string
}

const initialState: OrderState = {
  orders,
  newTableOrder: ''
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder (state, action: PayloadAction<OrderInterface>) {
      const updatedProducts = action.payload.products.map((orderItem) => {
        return {
          ...orderItem,
          orderId: action.payload.id
        }
      })

      const updatedOrder = {
        ...action.payload,
        products: updatedProducts
      }

      return {
        ...state,
        orders: [...state.orders, updatedOrder]
      }
    },
    removeOrder (state, action: PayloadAction<string>) {
      state.orders = state.orders.filter((order) => order.id !== action.payload)
    },
    changeOrderStatus (state, action: PayloadAction<{ id: string, status: OrderStatus }>) {
      const order = state.orders.find((order) => order.id === action.payload.id)
      if (order != null) {
        order.status = action.payload.status
        if (action.payload.status === 'done') {
          order.products.forEach((orderItem) => {
            orderItem.isCompleted = true
          })
        }
        if (action.payload.status === 'pending') {
          order.products.forEach((orderItem) => {
            orderItem.isCompleted = false
          })
          order.timestamp = new Date().toISOString()
        }
      }
    },
    toggleOrderItemStatus (state, action: PayloadAction<{ orderId: string, orderItemId: string }>) {
      const { orderId, orderItemId } = action.payload

      const order = state.orders.find((order) => order.id === orderId)
      if (order != null) {
        const orderItem = order.products.find((orderItem) => orderItem.id === orderItemId)
        if (orderItem != null) {
          orderItem.isCompleted = !orderItem.isCompleted
        } else {
          console.log('Acá no llego')
        }

        // Verificar si al menos un producto de la orden está en progreso
        const areItemsInProgress = order.products.some((orderItem) => !orderItem.isCompleted)
        if (areItemsInProgress) {
          order.status = 'inProgress'
        }

        // Verificar si todos los productos de la orden están completos
        const areItemsCompleted = order.products.every((orderItem) => orderItem.isCompleted)
        if (areItemsCompleted) {
          order.status = 'done'
        }

        // Verificar si todos los productos de la orden están pendientes
        const areItemsPending = order.products.every((orderItem) => !orderItem.isCompleted)
        if (areItemsPending) {
          order.status = 'pending'
        }
      } else {
        console.log('No la encontré')
      }
    },
    updateTableOrder (state, action: PayloadAction<string>) {
      state.newTableOrder = action.payload
    }
  }
})

export default orderSlice.reducer
export const { addOrder, removeOrder, changeOrderStatus, toggleOrderItemStatus, updateTableOrder } = orderSlice.actions
