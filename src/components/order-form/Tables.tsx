import data from '../../constants/data.json'
import { styled } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { updateTableOrder } from '../../features/order/orderSlice'
import { type RootState } from '../../app/store'

const TablesContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  place-items: center;
  gap: 10px;
`

const Table = styled.button<{ selected: boolean }>`
  width: 100px;
  padding: 10px;
  background-color: ${({ selected }) => selected ? '#000000' : 'transparent'};
  color: ${({ selected }) => selected ? 'white' : 'black'};
  border: 1px solid #000000;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #000000;
    color: white;
  }
`

const Tables: React.FC = () => {
  const { newTableOrder } = useSelector((state: RootState) => state.order)
  const dispatch = useDispatch()

  const handleTableClick = (id: string): void => {
    dispatch(updateTableOrder(id))
  }

  return (
    <TablesContainer>
      {
        data.tables.map((table) => (
          <Table type='button' selected={newTableOrder === table.id} key={table.id} onClick={() => { handleTableClick(table.id) }}>
            {table.name}
          </Table>
        ))
      }
    </TablesContainer>
  )
}

export default Tables
