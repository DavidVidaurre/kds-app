import Filters from "./Filters"
import Logo from "../../assets/Logo.webp"
import { styled } from "styled-components"
import { NewOrderIcon } from "../Icons"

const SideBarContainer = styled.aside`
  display: grid;
  grid-template-rows: auto 1fr auto;
  place-items: center;
  gap: 20px;
  padding: 10px;
  border-right: 1px solid #ccc;

  img {
    width: 150px;
  }

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid #ccc;
  }
`

const NewOrderButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #000000;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SideBar: React.FC<Props> = ({ setIsModalOpen }) => {
  const handleNewOrderClick = () => {
    setIsModalOpen(true)
  }

  return (
    <SideBarContainer>
      <img src={Logo} alt="Logo" />
      <Filters />
      <NewOrderButton onClick={handleNewOrderClick}>
        <NewOrderIcon />
        <span>NEW ORDER</span>
      </NewOrderButton>
    </SideBarContainer>
  )
}

export default SideBar