import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  authors,
  slug,
}) {
  console.log(authors)
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} url={coverImage.url} />
      </div>
      <div className="mb-4 text-xs uppercase flex gap-x-4">
        <Date dateString={date} />
        { authors[0].name}
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
