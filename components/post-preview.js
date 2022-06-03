import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from './cover-image'
import Link from 'next/link'
import styled from 'styled-components'

const PostInfoStyled = styled.p`

  
    position: relative;
    &:before {
      content: "";
      width: 5px;
      height: 5px;
      background: var(--color-secondary);
      border-radius: 100%;
      position: absolute;
      top: 5px;
      left: -10px;
  
  }
`


export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  authors,
  slug,
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} url={coverImage.url} />
      </div>
      <div className="mb-4 text-xs uppercase flex gap-x-4">
        <Date dateString={date} />
        <PostInfoStyled>{authors[0].name}</PostInfoStyled>
      </div>
      <h3 className="mb-3 text-3xl leading-snug">
        <Link href={`/posts/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <p className="mb-4 text-sms leading-relaxed">{excerpt}</p>
      {/* <Avatar name={authors[0].name} picture={authors[0].picture.url} dateString={date} /> */}
    </div>
  )
}
