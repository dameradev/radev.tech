import React from 'react';

import { getPost, getPostsByTag, getSlugs, getTag } from 'lib/wordpress'
import MoreStories from 'components/more-stories';
import Layout from 'components/layout';
const Tags = ({ posts }) => {
  console.log(posts)
  return (
    <Layout>
      <MoreStories posts={posts} />
    </Layout>
  );
};

export default Tags;




//hey Next, these are the possible slugs
export async function getStaticPaths() {
  const paths = await getSlugs('tags');
  

  console.log(paths)

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: 'blocking',
  };
}

//access the router, get the id, and get the data for that post
export async function getStaticProps({ params }) {
  const tag = await getTag(params.slug);
  // console.log(params)
  const posts = await getPostsByTag(tag.id);

  console.log(posts)
  // console.log(tag)
  // console.log(tag._links)


  // fetch all posts
  
  

  return {
    props: {
      posts
    },
    revalidate: 10, // In seconds
  };
}