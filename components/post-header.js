import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'

export default function PostHeader({ title, coverImage, date, authors }) {
  console.log(coverImage)
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className=" flex flex-col gap-4 ">
        <Avatar name={authors[0].name} picture={authors[0].picture.url} />
        <Date dateString={date} />
      </div>
      <div className="mx-5 sm:mx-0 flex justify-center w-full ">
        <CoverImage title={title} url={coverImage.url} />
      </div>
      <div className="max-w-2xl mx-auto">
        
        <div className="text-lg">
          
        </div>
      </div>
    </>
  )
}
