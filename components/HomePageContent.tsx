import React from 'react';

import HeroPost from './HeroPost';
import MoreStories from './MoreStories';
import Sidebar from './Sidebar';

const PostsList = ({ heroPost, tags, posts }) => {
  return (
    <>
      {/* {heroPost && ( */}
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.publishDate}
          author="dace"
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
          content={heroPost.content}
        />
      {/* )} */}
      <div className='md:grid grid-cols-8 '>
        <div className='col-span-6 md:pr-6'>
          {posts.length > 0 && <MoreStories className="mt-14 md:grid-cols-1 lg:grid-cols-2" posts={posts} />}
        </div>
        <Sidebar className="" tags={tags} />
      </div>
    </>
  );
};

export default PostsList;