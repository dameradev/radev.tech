import { parseISO, format } from 'date-fns'
// import { getDate } from '../lib/wordpress'

export default function Date({ dateString }) {
  // const date = getDate(dateString)
  
  return <time dateTime={dateString}>{dateString}</time>
}
