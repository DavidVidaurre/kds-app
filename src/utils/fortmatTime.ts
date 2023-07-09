export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds
  return `${minutesStr}:${secondsStr}`
}

export const formatTimeStamps = (timestamp: string): string => {
  const date: Date = new Date(timestamp)

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Lima',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  }

  const formattedTime: string = date.toLocaleString('es-PE', options)

  return formattedTime
}

export const getDiffTimeInSeconds = (timestamp: string): number => {
  const startTime: Date = new Date(timestamp)
  const endTime: Date = new Date()

  const timeDiff: number = endTime.getTime() - startTime.getTime()
  const seconds: number = Math.floor(timeDiff / 1000)

  return seconds
}
