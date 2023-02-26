import Link from 'next/link';

import Avatar from './Avatar';
import Date from './Date';
import { CoverImage } from './CoverImage';
import TimeToRead from './TimeToRead';


const PostPreview = ({
  title,
  coverImage,
  excerpt,
  timeToRead,
  slug,
  post,
}) => {
  return (
    <article className='bg-accent-1 rounded-2xl flex flex-col items-start justify-between'>
      <Link
        className='md:mb-5 block relative w-full h-[25rem] md:h-[30rem] lg:h-[30rem]'
        href={`/posts/${slug}`}
      >
        {coverImage && (
          <CoverImage slug={slug} title={title.rendered} url={coverImage} />
        )}
      </Link>
      <div className='px-4  my-4 text-xs uppercase flex gap-x-4 items-center'>
        <Date dateString={post.publishDate} />
        <TimeToRead timeToRead={timeToRead} />
      </div>
      <div className='px-4  flex flex-col'>
        <h3 className='mb-6 text-3xl leading-snug'>
          <Link className='hover:underline' href={`/posts/${slug}`}>
            {title}
          </Link>
        </h3>
      </div>
    </article>
  );
};

export default PostPreview;
