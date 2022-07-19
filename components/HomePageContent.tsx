import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
// import { getFeaturedImage } from '../lib/wordpress';
import HeroPost from './HeroPost';
import MoreStories from './MoreStories';
import Sidebar from './Sidebar';

const PostsList = ({ heroPost, tags, posts }) => {
  const router = useRouter();
  return (
    <>
      {heroPost && (
        <HeroPost

          title={heroPost.title}
          coverImage={heroPost.coverImage}

          date={heroPost.date}
          author="dace"
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      {/* <ul className="flex gap-4 mt-10 lg:mt-20 flex-wrap">
        <Link href='/' >
          <a className={`rounded-full border-[1px] px-6 py-2 text-xs ${router.pathname === "/" ? "text-secondary border-secondary" : ""}`}>
            ALL TAGS
          </a>
        </Link>
        {tags.map(tag => (
          <Link key={tag} href={tag.slug}>
            <a key={tag.name} className={`rounded-full border-[1px] px-6 py-2 text-xs  uppercase  ${router.query.slug === tag.slug ? "text-secondary border-secondary" : ""}`}>
              {tag.name}
            </a>
          </Link>
        ))}

      </ul> */}

      <hr className="mt-10" />

      <div className='md:grid grid-cols-8 '>
        <div className='col-span-6 md:pr-6'>
          {posts.length > 0 && <MoreStories className="" posts={posts} />}
        </div>

        <Sidebar className="" tags={tags} />
      </div>
    </>
  );
};

export default PostsList;