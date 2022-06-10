import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/PostTitle'

export default function PostHeader({ title, coverImage, date, authors }) {
  console.log(coverImage)
  return (
    <>
      <div className=" flex flex-col gap-4 mb-4">
        <Avatar name={authors[0].name} picture={authors[0].picture.url} dateString={date} />
      </div>
      <PostTitle>{title}</PostTitle>
      {/* <div className="md:mx-5 sm:mx-0 flex justify-center w-full cover-photo"> */}
        {/* <CoverImage title={title} url={coverImage.url} /> */}
      {/* </div> */}
      <div className="max-w-2xl mx-auto">
        
        <div className="text-lg">
          
        </div>
      </div>
    </>
  )
}
