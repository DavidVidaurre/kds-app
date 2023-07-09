import { OrderItem } from './OrderItem'
import { styled } from 'styled-components'
import { PrimaryButton, SecondaryButton } from '../Buttons'
import { type OrderInterface, type OrderStatus } from '../../interfaces/orderInterface'
import { useDispatch, useSelector } from 'react-redux'
import { changeOrderStatus } from '../../features/order/orderSlice'
import iconMap from '../../utils/iconMap'
import { type RootState } from '../../app/store'
import { Stopwatch } from './Stopwatch'
import { formatTimeStamps } from '../../utils/fortmatTime'

const OrderLetterContainer = styled.article`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 5px;
  background-color: #ffffff;
  border-radius: 8px;
  width: 100%;
  border: 5px solid #ccc;
`

const OrderLetterHeader = styled.header<{ status: OrderStatus }>`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  place-items: center;
  text-align: center;
  background-color: ${({ status }) => {
    switch (status) {
      case 'pending':
        return 'var(--status-pending)'
      case 'done':
        return 'var(--status-completed)'
      case 'cancelled':
        return 'var(--status-cancelled)'
      default:
        return 'var(--status-pending)'
    }
  }};
  padding: 5px;
  color: white;
`

const OrderLetterStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const OrderLetterSeparator = styled.div`
  width: 1px;
  height: 100%;
  background-color: #ccc;
`

const OrderLetterTimer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  & p {
    font-weight: bold;
  }
`

const OrderLetterInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
`

const OrderLetterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px;
`

interface Props {
  orderId: OrderInterface['id']
}

const OrderLetter: React.FC<Props> = ({ orderId }) => {
  const order = useSelector((state: RootState) => state.order.orders.find((order) => order.id === orderId)) as OrderInterface
  const dispatch = useDispatch()

  const { table, status, products } = order
  const Icon: React.FC = iconMap[status]

  const handleCompleteOrder = (): void => {
    dispatch(changeOrderStatus({ id: order.id, status: 'done' }))
  }

  const handleCancelOrder = (): void => {
    dispatch(changeOrderStatus({ id: order.id, status: 'cancelled' }))
  }

  const handleRestartOrder = (): void => {
    dispatch(changeOrderStatus({ id: order.id, status: 'pending' }))
  }

  return (
    <OrderLetterContainer>
      <OrderLetterHeader status={status}>
        <div>
          <span>Table</span>
          <h2>{table}</h2>
          <p>DINE IN</p>
        </div>
        <OrderLetterSeparator />
        <OrderLetterStatus>
          <Icon />
          <span>{status}</span>
        </OrderLetterStatus>
      </OrderLetterHeader>
      <OrderLetterTimer>
        <p>H- {formatTimeStamps(order.timestamp)}</p>
        {
          (status === 'inProgress' || status === 'pending') && (
            <Stopwatch timestamp={order.timestamp} />
          )
        }
        {/* <Stopwatch /> */}
      </OrderLetterTimer>
      <OrderLetterInfo>
        {
          products.map((item) => (
            <OrderItem key={item.id} item={item} orderStatus={status} />
          ))
        }
      </OrderLetterInfo>
      <OrderLetterButtons>
        {
          (status === 'inProgress' || status === 'pending') && (
            <>
              <PrimaryButton onClick={handleCompleteOrder}>Complete Order</PrimaryButton>
              <SecondaryButton onClick={handleCancelOrder}>Cancel Order</SecondaryButton>
            </>
          )
        }
        {
          status === 'cancelled' && (
              <PrimaryButton onClick={handleRestartOrder}>Restart Order</PrimaryButton>
          )
        }
      </OrderLetterButtons>
    </OrderLetterContainer>
  )
}

export default OrderLetter
