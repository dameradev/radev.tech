import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import Link from 'next/link'

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  console.log(coverImage)
  return (
    <section className='grid grid-cols-1 md:grid-cols-2  justify-center gap-8 items-start'>
      <div className="mb-8 md:mb-16 flex justify-center w-full ">
        <CoverImage slug={slug} title={title} url={coverImage.url} />
      </div>
      <div className="order-first md:order-last md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8  ">
        <h3 className="mb-4 text-4xl leading-tight  lg:text-5xl col-span-2">
          <Link href={`/posts/${slug}`}>
            <a className="hover:underline">{title}</a>
          </Link>
        </h3>
        <div className='flex w-full justify-between col-span-2 items-center py-4'>

          <div className="text-lg md:mb-0">
            <Date dateString={date} />
          </div>
        
          {/* <p className="mb-4 text-lg leading-relaxed">{excerpt}</p> */}
          <Avatar name={author.name} picture={author.picture.url} />
        </div>
        <p className="mb-4 text-lg leading-relaxed col-span-2">{excerpt}</p>
      </div>
    </section>
  )
}
