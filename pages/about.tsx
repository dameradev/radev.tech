import Layout from '@/components/Layout';
import React from 'react';
import MoreStories from '@/components/MoreStories';
import { supabaseClient } from '@/lib/hooks/useSupabase';
import { getAllArticles, notion } from '@/lib/notion';
import slugify from 'slugify';
import Link from 'next/link';

const About = ({ posts, latestPost }) => {
  return (
    <Layout preview="">
      <div className='container mx-auto'>
        <div className='max-w-[100rem]'>
          <h1 className='text-4xl md:text-5xl leading-relaxed'>
            I'm Damjan. I'm a developer and blogger freelancing on Upwork.
          </h1>
          <div className='flex gap-6 '>
            <Link className='text-white bg-secondary text-xs font-medium border-2 border-skin-secondary mt-4 p-3 rounded-full uppercase' href={`posts/${latestPost.slug}`}>
              Read the newst post
            </Link>
            <Link className='text-white bg-secondary text-xs font-medium border-2 border-skin-secondary mt-4 p-3 rounded-full uppercase' href="/contact">
              Get in touch
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
  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID);

  const postsPromises = data.map(async post => {
    
    let content;
    let blocks = await notion.blocks.children.list({
      block_id: post.id
    });

    content = [...blocks.results];

    while (blocks.has_more) {
      blocks = await notion.blocks.children.list({
        block_id: post.id,
        start_cursor: blocks.next_cursor
      });

      content = [...content, ...blocks.results];
    }
    return {
      id: post.id,
      title: post.properties.Name.title[0].plain_text,
      slug: slugify(post.properties.Name.title[0].plain_text.toLowerCase()),
      coverImage: post.properties.CoverImage.files[0].file ? post.properties.CoverImage.files[0].file.url : post.properties.CoverImage.files[0].name,
      excerpt: post.properties.Excerpt.rich_text[0].plain_text,
      publishDate: post.properties.PublishDate.created_time,
      editDate: post.properties.LastEdited.last_edited_time,
      content
    }
  })

  const posts = await Promise.all(postsPromises)
  const latestPost = posts.find(post => post.publishDate === posts.sort((a, b) => b.publishDate - a.publishDate)[0].publishDate);

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