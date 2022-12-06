import Avatar from './Avatar'
import Date from './Date'
import CoverImage from './CoverImage'
import Link from 'next/link'
import styled from 'styled-components'
import { getTimeToRead } from '../lib/timeToRead'
import TimeToRead from './TimeToRead'

const ReadMoreLink = styled.a`
  padding: 1rem 2rem;
  background: transparent linear-gradient(90deg, #F24E41 0%, #F09A2D 100%, #F09D2C 100%) 0% 0% no-repeat padding-box;
  width: fit-content;
  border-radius: 30px;
  text-transform: uppercase;
  color: #fff;
`


export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  content
}) {

  const timeToRead = getTimeToRead(content)
  return (
    <section className='mt-5 lg:mt-10 grid grid-cols-1 md:grid-cols-2 justify-center gap-x-8 items-center '>
      <div className="mb-5 block relative w-full h-[25rem] md:h-[45rem]" >
        {coverImage && <CoverImage slug={slug} title={title} url={coverImage} />}
      </div>
      <div className="min-h-full order-first lg:order-last grid grid-cols-1  md:gap-x-16 lg:gap-x-8 gap-y-4   ">
        <div className='flex flex-col gap-6'>
          <h3 className="mb-4 text-3xl font-bold leading-tight col-span-2 lg:text-4xl ">
            <Link className="hover:underline" href={`/posts/${slug}`}>
              {title}
            </Link>
          </h3>
          <div className="mb-4 text-lg leading-relaxed  "
            dangerouslySetInnerHTML={{
              __html: excerpt,
            }}
          ></div>
          <Link href={`/posts/${slug}`}><ReadMoreLink className="text-xs h-min cursor-pointer">Read more</ReadMoreLink></Link>
        </div>
        <div className='self-end'>

          <div className="text-lg md:mb-0 flex justify-between items-center">
            <Date dateString={date} /> <TimeToRead timeToRead={timeToRead} />
          </div>

          {/* <p className="mb-4 text-lg leading-relaxed">{excerpt}</p> */}
          {/* {author && <Avatar name={author.name} picture={author.picture.url} dateString={date} />} */}
        </div>
      </div>
    </section>
  )
}
