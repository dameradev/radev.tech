// import { getDate } from '@/lib/wordpress';
import React from 'react';

import Image from 'next/image';

const Comment = ({ className, comment, reply, hasReplies }) => {
  
  return (
    <div className={`mx-6 mt-6 border-slate-200 pb-4 max-w-full ${className} ${!hasReplies ? 'border-b-[1px]' : ""}`}>
      <div className="flex justify-between">
        <div className="flex">

          
          <Image className="w-12 rounded-full mr-4" src={comment.author_avatar_urls[96]} alt={''} />
          <p className="font-bold mt-2 ">{comment.author_name} {!reply ? "says" : "replied"}:</p>
        </div>
        {/* <p className='italic text-xs justify-end'>{getDate(comment.date)}</p> */}
      </div>
      <div className="col-span-8 md:col-span-6 lg:col-span-4 pl-17"  dangerouslySetInnerHTML={{ __html: comment.content?.rendered }} />
    </div>
  );
};

export default Comment;