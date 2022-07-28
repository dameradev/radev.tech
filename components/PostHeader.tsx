import Avatar from './Avatar'
import Date from './Date'
import CoverImage from './CoverImage'
import PostTitle from './PostTitle'

import { BookOpenIcon, EyeIcon } from '@heroicons/react/outline'
import PageViews from './PageViews'

export default function PostHeader({ title, slug, coverImage, timeToRead, date, authors }) {
  return (
    <>
      <div className=" flex flex-col gap-4 mb-4">
        {/* {authors[0] && <Avatar name={authors[0].name} picture={authors[0].picture.url} dateString={date} />} */}
      </div>
      <PostTitle>{title}</PostTitle>
      <div className="flex gap-6 justify-center flex-wrap">
        {/* <p className='text-center text-xl h-10 items-center flex gap-2'><EyeIcon className="w-6"/> <span className=''>{totalViews} views </span></p> */}
        <PageViews slug={slug}/>
        <p className='text-center text-xl h-10 items-center flex gap-2'><BookOpenIcon className="w-6"/> <span className=''>{Math.round(timeToRead.minutes)} min read</span></p>
        
      </div>
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
