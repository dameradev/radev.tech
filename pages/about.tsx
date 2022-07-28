import Layout from '../components/Layout';
import React from 'react';
import MoreStories from '../components/MoreStories';
import { supabaseClient } from '../lib/hooks/useSupabase';
import { getAllArticles } from '../lib/notion';
import slugify from 'slugify';
import Link from 'next/link';

const About = ({ posts, latestPost }) => {
  return (
    <Layout preview="">
      {/* <h1>About me</h1> */}

      <div className='container mx-auto'>

        <div className='max-w-[100rem]'>

          <h1 className='text-4xl md:text-5xl leading-relaxed'>
            I'm Damian. I'm a developer and blogger freelancing on Upwork.
          </h1>
          <div className='flex gap-6 '>
            <Link href={`posts/${latestPost.slug}`}>

              <a className='text-white bg-secondary text-xs font-medium border-2 border-skin-secondary mt-4 p-3 rounded-full uppercase'>
                Read the newst post
              </a>
            </Link>
            <Link href="/contact">

              <a className='text-white bg-secondary text-xs font-medium border-2 border-skin-secondary mt-4 p-3 rounded-full uppercase'>
                Get in touch
              </a>
            </Link>

          </div>
        </div>

        <h2 className='mt-10 text-3xl mb-6'>Here are some of my recent stories</h2>
        <MoreStories className="" posts={posts} />
      </div>


    </Layout>
  );
};

export default About;

export const getStaticProps = async () => {


  // const profilePicture = await getTwitterProfilePicture();


  // const notion = new Client({
  //   auth: process.env.NOTION_SECRET
  // });

  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID);

  const posts = data.map(post => {
    // console.log(post.properties.Excerpt)
    return {
      id: post.id,
      title: post.properties.Name.title[0].plain_text,
      slug: slugify(post.properties.Name.title[0].plain_text.toLowerCase()),
      publishDate: post.created_time,
      coverImage: post.properties.CoverImage.files[0].file.url,
      excerpt: post.properties.Excerpt.rich_text[0].plain_text,
      // excerpt: "",
    }
  })

  const latestPost = posts.find(post => post.publishDate === posts.sort((a, b) => b.publishDate - a.publishDate)[0].publishDate);
  console.log(latestPost)



  return {
    props: {
      posts,
      latestPost
      // moreArticles,
      // profilePicture,
      // sponsoredArticleUrl
    },
    revalidate: 30
  };
};