export const KDS_FILTERS = {
  ALL: 'all',
  PENDING: 'pending',
  IN_PROGRESS: 'inProgress',
  DONE: 'done',
  CANCELLED: 'cancelled'
} as const

export const FILTERS_BUTTONS = {
  [KDS_FILTERS.ALL]: {
    literal: 'ALL',
    href: `/?filter=${KDS_FILTERS.ALL}}`
  },
  [KDS_FILTERS.PENDING]: {
    literal: 'PENDING',
    href: `/?filter=${KDS_FILTERS.PENDING}`
  },
  [KDS_FILTERS.IN_PROGRESS]: {
    literal: 'IN PROGRESS',
    href: `/?filter=${KDS_FILTERS.IN_PROGRESS}`
  },
  [KDS_FILTERS.DONE]: {
    literal: 'DONE',
    href: `/?filter=${KDS_FILTERS.DONE}`
  },
  [KDS_FILTERS.CANCELLED]: {
    literal: 'CANCELLED',
    href: `/?filter=${KDS_FILTERS.CANCELLED}`
  }
} as const
