import { styled, css } from 'styled-components'

export const buttonStyles = css`
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  width: 100%;
`

export const PrimaryButton = styled.button`
  background-color: var(--status-completed);
  ${buttonStyles}
`

export const SecondaryButton = styled.button`
  background-color: var(--status-cancelled);
  ${buttonStyles}
`
