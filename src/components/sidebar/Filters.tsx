import { useDispatch, useSelector } from "react-redux"
import { FILTERS_BUTTONS } from "../../constants/constants"
import { type FilterValue } from "../../interfaces/orderInterface"
import { styled } from 'styled-components'
import { setFilter } from "../../features/filter/filterSlice"
import { RootState } from "../../app/store"
import iconMap from "../../utils/iconMap"

const FiltersContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;

  & li {
    list-style: none;
    width: 100%;

    & a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      color: #000000;
      padding: 10px 0;

      & svg:hover {
        background-color: transparent;
      }
    }
    
    & a.selected, :hover {
      background-color: #00000057;
      border-radius: 8px;
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    flex-direction: row;
  }
`

const Filters: React.FC = () => {
  const filterSelected = useSelector((state: RootState) => state.filter.filter)
  const dispatch = useDispatch()

  const handleFilterChange = (filter: FilterValue): void => {
    dispatch(setFilter(filter))
  }

  return (
    <FiltersContainer>
      {
        Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
          const isSelected = key === filterSelected
          const classname = isSelected ? 'selected' : ''

          const Icon: React.FC = iconMap[key as FilterValue]

          return (
            <li key={key}>
              <a
                href={href}
                className={classname}
                onClick={(e) => {
                  e.preventDefault()
                  handleFilterChange(key as FilterValue)
                }}
              >
                <Icon />
                {literal}
              </a>
            </li>
          )
        })
      }
    </FiltersContainer>
  )
}

export default Filters