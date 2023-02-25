import React from 'react';

import HeroPost from './HeroPost';
import MoreStories from './MoreStories';
import Sidebar from './Sidebar';

const PostsList = ({ heroPost, tags, posts }) => {
  return (
    <>
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
      <div className='md:grid grid-cols-12'>
        <div className='col-span-12 '>
          {posts.length > 0 && <MoreStories className="mt-14 " posts={posts} />}
        </div>
        {/* <Sidebar className="" tags={tags} /> */}
      </div>
    </>
  );
};

export default PostsList;