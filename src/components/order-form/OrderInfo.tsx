import { styled } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../app/store'
import { PrimaryButton, SecondaryButton } from '../Buttons'

import { removeOrderItem, updateQuantity } from '../../features/order-item/orderItemSlice'

const OrderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;

  h3 {
    text-align: center;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    
    position: sticky;
    top: 0;
    background-color: white;
  }
`

const OrdenInfoItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
`

const OrderItem = styled.div`
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #219ebc;
  color: white;
  cursor: pointer;
  font-weight: bold;
`

const OrderQuantityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;

  & > span {
    font-weight: bold;
    font-size: 1.2rem;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    height: 35px;
  }
`

const OrderInfo: React.FC = () => {
  const { orderItems } = useSelector((state: RootState) => state.orderItem)
  const dispatch = useDispatch()

  const handleDeleteItem = (id: string): void => {
    dispatch(removeOrderItem(id))
  }

  const handleAddQuantity = (id: string): void => {
    dispatch(updateQuantity({ orderItemId: id, actionQuantity: 'increment' }))
  }

  const handleSubtractQuantity = (id: string): void => {
    dispatch(updateQuantity({ orderItemId: id, actionQuantity: 'decrement' }))
  }

  return (
    <OrderInfoContainer>
      <h3>Menu Items</h3>
      {
        orderItems.map((item) => (
          <OrdenInfoItem key={item.id}>
            <OrderItem>{item.name}</OrderItem>
            <OrderQuantityContainer>
              <SecondaryButton type='button'onClick={() => { handleSubtractQuantity(item.id) }}>-</SecondaryButton>
              <span>{item.quantity}</span>
              <PrimaryButton type='button' onClick={() => { handleAddQuantity(item.id) }}>+</PrimaryButton>
            </OrderQuantityContainer>
            <SecondaryButton type='button' onClick={() => { handleDeleteItem(item.id) }}>Delete</SecondaryButton>
          </OrdenInfoItem>
        ))
      }
    </OrderInfoContainer>
  )
}

export default OrderInfo
