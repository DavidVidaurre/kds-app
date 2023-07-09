import {
  DoneIcon,
  PendingIcon,
  CancelledIcon,
  InProgressIcon,
  WhitoutFilterIcon
} from '../components/Icons'

type IconMap = Record<string, React.FC>

const iconMap: IconMap = {
  pending: PendingIcon,
  inProgress: InProgressIcon,
  done: DoneIcon,
  cancelled: CancelledIcon,
  all: WhitoutFilterIcon
}

export default iconMap
