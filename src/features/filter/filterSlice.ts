import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type OrderStatusFilter } from '../../interfaces/orderInterface'

interface FilterState {
  filter: OrderStatusFilter
}

const initialState: FilterState = {
  filter: 'all'
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter (state, action: PayloadAction<OrderStatusFilter>) {
      state.filter = action.payload
    }
  }
})

export default filterSlice.reducer
export const { setFilter } = filterSlice.actions
