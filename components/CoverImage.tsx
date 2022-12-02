import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'

export default function CoverImage({ title, url, slug }) {
  const image = (
    <Image
    layout="responsive"
    width="100"
    height="65"
      alt={`Cover Image for ${title}`}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200 rounded-2xl': slug,
      })}
      src={url}
    />
  )
  return image
  // return (
  //   <div className="sm:mx-0 bg-white rounded-3xl">
  //     {slug ? (
  //       <Link href={`/posts/${slug}`}>
  //         <a aria-label={title}>{image}</a>
  //       </Link>
  //     ) : (
  //       image
  //     )}
  //   </div>
  
  // )
}
