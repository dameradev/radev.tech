import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import Link from 'next/link'
import styled from 'styled-components'

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
}) {

  return (
    <section className='mt-5 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 justify-center gap-x-8 items-center '>
      <div className="mt-4 lg:mt-0">
        {coverImage && <CoverImage slug={slug} title={title} url={coverImage} />}
      </div>
      <div className="min-h-full order-first lg:order-last grid grid-cols-1  md:gap-x-16 lg:gap-x-8 gap-y-4   ">
        <div className='flex flex-col gap-6'>
          <h3 className="mb-4 text-3xl font-bold leading-tight  lg:text-4xl ">
            <Link href={`/posts/${slug}`}>
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 text-md leading-relaxed  "
            dangerouslySetInnerHTML={{
              __html: excerpt,
            }}
          ></div>
          <Link href={`/posts/${slug}`}><ReadMoreLink className="text-xs h-min cursor-pointer">Read more</ReadMoreLink></Link>
        </div>
        <div className='self-end'>

          {/* <div className="text-lg md:mb-0">
            <Date dateString={date} />
          </div> */}

          {/* <p className="mb-4 text-lg leading-relaxed">{excerpt}</p> */}
          {author && <Avatar name={author.name} picture={author.picture.url} dateString={date} />}
        </div>
      </div>
    </section>
  )
}
