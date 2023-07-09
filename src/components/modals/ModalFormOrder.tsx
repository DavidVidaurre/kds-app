import Modal from './Modal'
import FormAddOrder from '../order-form/FormAddOrder'

interface Props {
  isOpen: boolean
  onClose: () => void
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const ModalFormOrder: React.FC<Props> = ({ isOpen, onClose, onFormSubmit }) => {
  if (!isOpen) return null

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    onFormSubmit(e)
    onClose()
  }

  return (
    <Modal>
      <FormAddOrder onClose={onClose} onFormSubmit={handleFormSubmit} />
    </Modal>
  )
}

export default ModalFormOrder
