import Avatar from './Avatar'
import Date from './Date'
import CoverImage from './CoverImage'
import Link from 'next/link'
import styled from 'styled-components'
import TimeToRead from './TimeToRead'
import { device } from '../styles/deviceSIzes'
// import { getFeaturedImage } from '../lib/wordpress'


const PostStyled = styled.div`

  border-bottom: 1px solid var(--accent-3); 
  &:first-of-type {
    border-top: 1px solid #747474; 
    padding-top: 3rem;
  }
  
  &:last-of-type { 
    
    border-bottom: none; 
  }

  padding-bottom: 2rem;
  &:hover { 
    img {
      opacity: 0.8;
    }
  }

  max-height: min-content;
  .excerpt {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }

  @media ${device.tabletMini} {
    flex-direction: column-reverse;
    display: flex;
  }


`

export default function PostPreview({
  title,
  coverImage,
  excerpt,
  timeToRead,
  slug,
  post
}) {

  return (
    <PostStyled>

      <Link href={`/posts/${slug}`}>
        <a className="mb-5 block relative">
          {coverImage && <CoverImage slug={slug} title={title.rendered} url={coverImage} />}
        </a>
      </Link>
      <div className="mb-4 text-xs uppercase flex gap-x-4 items-center">
        <Date dateString={post.publishDate} />
        <TimeToRead timeToRead={timeToRead} />
      </div>
      <div className='flex flex-col'>

        <h3 className="mb-6 text-3xl leading-snug">
          <Link href={`/posts/${slug}`}>
            <a className="hover:underline">{title}</a>
          </Link>
        </h3>

        <div className="excerpt mb-4 text-lg leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: excerpt
          }}>

        </div>
      </div>

    </PostStyled>
  )
}
