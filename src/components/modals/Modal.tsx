import ReactDOM from 'react-dom'
import { styled } from 'styled-components'

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`

interface Props {
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ children }) => {
  return ReactDOM.createPortal(
    <ModalContainer>
      {children}
    </ModalContainer>,
    document.getElementById('modal-root') as HTMLElement
  )
}

export default Modal
