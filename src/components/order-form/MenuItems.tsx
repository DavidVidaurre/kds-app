import { styled } from 'styled-components'
import data from '../../constants/data.json'
import { useDispatch } from 'react-redux'
import { addOrderItem } from '../../features/order-item/orderItemSlice'
import { type OrderItemInterface } from '../../interfaces/orderInterface'

const MenuItemsContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
  overflow-y: auto;
`

const MenuItemTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`

const MenuItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  overflow-y: auto;
`

const MenuItem = styled.button`
  padding: 10px;
  border-radius: 8px;
  border: none;
  /* background-color: #0000009E; */
  background-color: #ffffff;
  border: 1px solid #000000;
  color: black;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #000000;
    color: white;
  }
`

type OrderItemPick = Pick<OrderItemInterface, 'id' | 'name'>

const MenuItems: React.FC = () => {
  const dispatch = useDispatch()

  const handleAddOrderItem = (item: OrderItemPick): void => {
    const orderItem = {
      id: crypto.randomUUID(),
      itemId: item.id,
      orderId: '',
      name: item.name,
      quantity: 1,
      isCompleted: false
    }

    dispatch(addOrderItem(orderItem))
  }

  return (
    <MenuItemsContainer>
      <MenuItemTitle>Menu</MenuItemTitle>
      <MenuItemsWrapper>
        {
          data.menu.map((item) => (
            <MenuItem type='button' key={item.id} onClick={() => { handleAddOrderItem(item) }}>
              {item.name}
            </MenuItem>
          ))
        }
      </MenuItemsWrapper>
    </MenuItemsContainer>
  )
}

export default MenuItems
