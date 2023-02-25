import { formatDate } from '@/lib/formatDate'

const DateFormatted = ({ dateString }) => {  
  const date = formatDate(dateString)
  return <time className="capitalize" dateTime={dateString}>{date}</time>
}

export default DateFormatted