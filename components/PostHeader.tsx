import Avatar from './Avatar'
import Date from './Date'
import CoverImage from './CoverImage'
import PostTitle from './PostTitle'

import { ArrowUpIcon, BookOpenIcon, EyeIcon, UploadIcon } from '@heroicons/react/outline'
import PageViews from './PageViews'
import { FaEdit, FaParachuteBox } from 'react-icons/fa'
import TimeToRead from './TimeToRead'

export default function PostHeader({ title, slug, coverImage, timeToRead, date, editDate }) {
  return (
    <>
      <div className=" flex flex-col gap-4 mb-4">
        {/* {authors[0] && <Avatar name={authors[0].name} picture={authors[0].picture.url} dateString={date} />} */}
      </div>
      <PostTitle>{title}</PostTitle>
      <div className="flex gap-8 justify-center flex-wrap items-center">

        <div className='flex flex-col gap-2'>
          <PageViews slug={slug} />
          <TimeToRead timeToRead={timeToRead} />
        </div>
        <div className=" flex flex-col gap-2 h-full justify-between">
          <span className='flex items-center justify-between w-full gap-2 '><ArrowUpIcon className="w-6" /> <Date dateString={date} /></span>
          <span className='flex items-center justify-between w-full gap-2 '><FaEdit /> <Date dateString={editDate} /></span>
        </div>
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
