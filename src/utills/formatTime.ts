export default function formatTime(time: Date) {
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const formattedHours = String(hours).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}`
}
