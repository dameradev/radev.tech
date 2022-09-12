import { formatDate } from '../lib/formatDate'

export default function DateFormatted({ dateString }) {  
  const date = formatDate(dateString)

  return <time className="capitalize text-xl" dateTime={dateString}>{date}</time>
}
