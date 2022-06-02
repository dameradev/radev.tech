import { parseISO, format } from 'date-fns';
import Image from 'next/image'


export default function Avatar({ name, picture, dateString }) {
  const date = parseISO(dateString)


  return (
    <div className="flex items-center justify-self-end">
      <div className="w-12 h-12 relative mr-4">
        <Image
          src={picture}
          layout="fill"
          className="rounded-full"
          alt={name}
        />
      </div>
      <div>

        <p className="text-xl font-bold">{name}</p>

        <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
      </div>
    </div>
  )
}
