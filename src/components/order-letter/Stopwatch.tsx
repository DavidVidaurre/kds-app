import { StopWatchIcon } from '../Icons'
import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
import { formatTime, getDiffTimeInSeconds } from '../../utils/fortmatTime'

const StopwatchContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  & span {
    font-weight: bold;
  }
`

interface Props {
  timestamp: string
}

export const Stopwatch: React.FC<Props> = ({ timestamp }) => {
  const [seconds, setseconds] = useState(getDiffTimeInSeconds(timestamp))

  useEffect(() => {
    const interval = setInterval(() => {
      setseconds((prevSeconds) => prevSeconds + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [seconds])

  return (
    <StopwatchContainer>
      <StopWatchIcon />
      <span>{formatTime(seconds)}</span>
    </StopwatchContainer>
  )
}
