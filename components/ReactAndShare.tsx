import { fetcher } from '@/lib/fetcher';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ShareArticle } from './ShareArticle';
import { FaHeart, FaLaugh, FaThumbsUp } from 'react-icons/fa';

const ReactAndShare = ({ slug, title, className }) => {
  const { data } = useSWR<{ like: number; love: number; smile: number }>(
    `/api/react/${slug}`,
    fetcher
  );

  // console.log(data);
  const [reactions, setReactions] = useState({ ...data });

  useEffect(() => {
    if (data) {
      setReactions({ ...data });
    }
  }, [data]);

  const ReactToPost = (reaction) => {
    fetch(`/api/react/${slug}`, {
      method: 'POST',
      body: JSON.stringify({
        react: reaction,
      }),
    });

    setReactions((prev) => {
      return {
        ...prev,
        [reaction]: prev[reaction] + 1,
      };
    });
  };

  return (
    <div className={`mt-8  md:fixed flex flex-col items-center justify-start ${className}`}>
      {/* Share */}
      <ShareArticle title={title} slug={slug} />

      <div className='md:mt-[10rem] text-center'>
        {/* React */}
        <ul className=' flex md:flex-col gap-4 mt-4'>
          <button
            onClick={() => ReactToPost('like')}
            className='bg-code w-full px-5 h-10 py-2 rounded-full flex gap-4 items-center active:scale-x-90'
          >
            {reactions?.like}
            <FaThumbsUp className='w-5 h-5 mb-1' />
          </button>
          <button
            onClick={() => ReactToPost('love')}
            className='bg-code w-full px-5 h-10 py-2 rounded-full flex gap-4 items-center active:scale-x-90'
          >
            {reactions?.love}

            <FaHeart className='w-5 h-5' />
          </button>
          <button
            onClick={() => ReactToPost('smile')}
            className='bg-code w-full px-5 h-10 py-2 rounded-full flex gap-4 items-center active:scale-x-90'
          >
            {reactions?.smile}

            <FaLaugh className='w-5 h-5' />
          </button>
        </ul>
      </div>
    </div>
  );
};

export default ReactAndShare;
