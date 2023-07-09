import OrderLetter from './OrderLetter'
import { useSelector } from 'react-redux'
import { type RootState } from '../../app/store'
import { styled } from 'styled-components'
import { KDS_FILTERS, FILTERS_BUTTONS } from '../../constants/constants'

const OrderListContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
  height: 100vh;

  & h3 {
    height: 100%;
    display: flex;
    align-items: center;
  }

  @media (max-width: 768px) {
    height: 100%;
  }
`

const OrdersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  gap: 20px;
  width: 100%;
  /* max-height: 100%; */
  overflow-y: auto;
`

const OrderList: React.FC = () => {
  const orders = useSelector((state: RootState) => state.order.orders)
  const filterSelected = useSelector((state: RootState) => state.filter.filter)

  const filteredOrders = orders.filter(order => {
    if (filterSelected === KDS_FILTERS.PENDING) return order.status === KDS_FILTERS.PENDING
    if (filterSelected === KDS_FILTERS.IN_PROGRESS) return order.status === KDS_FILTERS.IN_PROGRESS
    if (filterSelected === KDS_FILTERS.DONE) return order.status === KDS_FILTERS.DONE
    if (filterSelected === KDS_FILTERS.CANCELLED) return order.status === KDS_FILTERS.CANCELLED
    return order
  })

  return (
    <OrderListContainer>
      <h2>{FILTERS_BUTTONS[filterSelected].literal} ORDERS</h2>
        {
          filteredOrders.length > 0
            ? (
            <OrdersContainer>
              {
                filteredOrders.map((order) => (
                  <OrderLetter key={order.id} orderId={order.id} />
                ))
              }
            </OrdersContainer>
              )
            : (
            <h3>🚫 NO {FILTERS_BUTTONS[filterSelected].literal} ORDERS</h3>
              )
        }
    </OrderListContainer>
  )
}

export default OrderList
