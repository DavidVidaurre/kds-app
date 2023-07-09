import { styled } from 'styled-components'
import { type OrderItemInterface } from '../../interfaces/orderInterface'
import { useDispatch } from 'react-redux'
import { toggleOrderItemStatus } from '../../features/order/orderSlice'

const OrderItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`

const OrderItemInfo = styled.div`
  width: 100%;
  text-align: start;
`

// const OrderItemExtra = styled.div`
//   span {
//     font-size: 0.8em;
//     color: var(--status-completed);
//   }
// `

// const OrderItemExclude = styled.div`
//   span {
//     font-size: 0.8em;
//     color: var(--status-cancelled);
//   }
// `

const OrderItemSwitch = styled.div`
  input[type="checkbox"] {
    display: none;
    &:checked + .lbl-switch {
      background-color: var(--status-completed);
    }
    &:checked + .lbl-switch::after {
      left: calc(100% - 2px);
      transform: translateX(-100%);
    }
  }
  .lbl-switch {
    display: inline-block;
    width: 40px;
    height: 20px;
    background-color: #aaa;
    border-radius: 100px;
    position: relative;
    cursor: pointer;
    &::after {
      position: absolute;
      content: '';
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background-color: #fff;
      top: 2px;
      left: 2px;
      transition: all 0.3s;
    }
  }
`

interface Props {
  item: OrderItemInterface
  orderStatus: string
}

export const OrderItem: React.FC<Props> = ({ item, orderStatus }) => {
  const dispatch = useDispatch()

  const handleToogleOrderItemStatus = (): void => {
    dispatch(toggleOrderItemStatus({ orderId: item.orderId, orderItemId: item.id }))
  }

  return (
    <OrderItemContainer>
        <h3>x{item.quantity}</h3>
      <OrderItemInfo>
        <p>{item.name}</p>
        {/* <OrderItemExtra>
          {
            item.specialInstructions.include.length > 0 && (
              <span>
                + {item.specialInstructions.include}
              </span>
            )
          }
        </OrderItemExtra>
        <OrderItemExclude>
          {
            item.specialInstructions.exclude.length > 0 && (
              <span>
                - {item.specialInstructions.exclude}
              </span>
            )
          }
        </OrderItemExclude> */}
      </OrderItemInfo>
      {
        orderStatus !== 'done' && orderStatus !== 'cancelled' && (
          <OrderItemSwitch>
            <input type="checkbox" id={`${item.id}`} checked={item.isCompleted} onChange={handleToogleOrderItemStatus} />
            <label htmlFor={`${item.id}`} className="lbl-switch"></label>
          </OrderItemSwitch>
        )
      }
    </OrderItemContainer>
  )
}
