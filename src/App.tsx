import './App.css'
import { useState } from 'react'
import SideBar from './components/sidebar/SideBar'
import OrderList from './components/order-letter/OrderList'
import { styled } from 'styled-components'
import ModalFormOrder from './components/modals/ModalFormOrder'
import { useSelector, useDispatch } from 'react-redux'
import { addOrder, updateTableOrder } from './features/order/orderSlice'
import { resetOrderItems } from './features/order-item/orderItemSlice'
import { type RootState } from './app/store'
import { type OrderInterface } from './interfaces/orderInterface'

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  width: 100%;
  min-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`

function App (): JSX.Element {
  const { orderItems } = useSelector((state: RootState) => state.orderItem)
  const { newTableOrder } = useSelector((state: RootState) => state.order)
  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalClose = (): void => {
    setIsModalOpen(false)
    dispatch(resetOrderItems())
    dispatch(updateTableOrder(''))
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const orderData: OrderInterface = {
      id: crypto.randomUUID(),
      table: newTableOrder,
      products: orderItems,
      status: 'pending',
      timestamp: new Date().toISOString()
    }

    if (orderItems.length === 0) return
    if (newTableOrder === '') return

    dispatch(addOrder(orderData))
    dispatch(resetOrderItems())
    dispatch(updateTableOrder(''))
  }

  return (
    <>
      <AppContainer>
        <SideBar setIsModalOpen={setIsModalOpen} />
        <OrderList />
      </AppContainer>
      {
        isModalOpen && (
          <ModalFormOrder isOpen={isModalOpen} onClose={handleModalClose} onFormSubmit={onFormSubmit} />
        )
      }
    </>
  )
}

export default App
