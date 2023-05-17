import Layout from '@/components/Layout';
import React from 'react';
import MoreStories from '@/components/MoreStories';
import { supabaseClient } from '@/lib/hooks/useSupabase';
import { getAllArticles, notion } from '@/lib/notion';
import slugify from 'slugify';
import Link from 'next/link';
import { BLOG_DATABASE_ID } from '@/lib/constants';
import Image from 'next/image';

const About = ({ posts, latestPost }) => {
  return (
    <Layout preview=''>
      <div className='container mx-auto'>
        <div className='grid  grid-cols-1 md:grid-cols-[60%_1fr] lg:grid-cols-[75%_1fr] gapx-1 py-[2px] 0'>
          <div>
            <h1 className='text-5xl'>About Me</h1>
            <article>
              <section className='my-10'>
                <h2 className='text-4xl mb-4'>The Journey</h2>
                <p className='leading-[3rem] text-lg'>
                  Hello, world! I'm Damjan, a creative developer and curious
                  learner. My journey started back in my last year at the
                  university. As a Business major, I realized I wanted something
                  different, something challenging yet something I would want to
                  do every day. That’s when I embarked on a path toward becoming
                  a web developer. I took a deep dive into coding, starting with
                  Ruby, and fell in love with the logic, the problem-solving,
                  and the ability to bring ideas to life.
                </p>

                <p className='leading-[3rem] text-lg'>
                  Over the years, I’ve honed my skills in <span className='bg-red-800 ml-1 rounded-xl px-1 py-[2px]  text-white'>HTML5</span>,
                  <span className='bg-purple-500 ml-1 rounded-xl px-1 py-[2px]  text-white'>CSS3</span>, <span className='bg-red-500 ml-1 rounded-xl px-1 py-[2px]  text-white'>SCSS/SASS</span>, and
                  <span className='bg-yellow-600 ml-1 rounded-xl px-1 py-[2px]  text-white'>JavaScript</span>, building responsive websites that
                  prioritize user experience. I've embraced the power of modern
                  technologies such as <span className='bg-blue-600 ml-1 rounded-xl px-1 py-[2px]  text-white'> ReactJS</span>,
                  <span className='bg-blue-400 ml-1 rounded-xl px-1 py-[2px]  text-white'>Material UI</span>, <span className='bg-green-700 ml-1 rounded-xl px-1 py-[2px]  text-white'>Tailwind CSS</span>,
                  <span className='bg-green-500 ml-1 rounded-xl px-1 py-[2px]  text-white'>Next.js</span>, <span className='bg-purple-700 ml-1 rounded-xl px-1 py-[2px]  text-white'>Gatsby.js</span>, and
                  <span className='bg-red-700 ml-1 mr-1 rounded-xl px-1 py-[2px]  text-white'>GraphQL </span>to create dynamic, engaging, and
                  interactive digital experiences.
                </p>
              </section>
              <section className='my-10'>
                <h2 className='text-4xl mb-4'>The Backend Expertise</h2>
                <p className='leading-[3rem] text-lg'>
                  But my skills don't end at the user interface. Recognizing the
                  importance of the complete web ecosystem, I immersed myself in
                  backend technologies, mastering Node.js, Prisma, and GraphQL.
                  I’m also versatile in using CMSs, I've worked with{' '}
                  <span className='bg-green-500 ml-1 rounded-xl px-1 py-[2px]  text-white'>Shopify</span>,<span className='bg-red-500 ml-1 rounded-xl px-1 py-[2px]  text-white'>Sanity</span>, <span className='bg-blue-500 ml-1 rounded-xl px-1 py-[2px]  text-white'>Strapi</span>,{' '}
                  <span className='bg-blue-800 ml-1 rounded-xl px-1 py-[2px]  text-white'>Keystone</span>, and <span className='bg-yellow-800 ml-1 rounded-xl px-1 py-[2px]  text-white'>Prismic</span>, aiming to
                  provide a smooth and efficient content management process for
                  my clients.
                </p>
              </section>

              <section className='my-10'>
                <h2 className='text-4xl mb-4'>The Freelancer</h2>
                <p className='leading-[3rem] text-lg'>
                  I took my skills to the digital marketplace, becoming a
                  freelancer on Upwork. Starting from the humble beginnings of
                  an $8/hour gig, I've now made my way to $50+/hour contracts,
                  always learning and improving along the way. The freelance
                  life has allowed me the freedom to work from anywhere, at any
                  time, and this has made my dream of traveling the world come
                  true. I’m still embracing this lifestyle and prefer to work
                  with clients as a contractor.
                </p>
              </section>
              <section className='my-10'>
                <h2 className='text-4xl mb-4'>The Mindful Coder</h2>
                <p className='leading-[3rem] text-lg'>
                  Beyond the codes and scripts, I'm an ardent practitioner of
                  mindfulness. I believe in the power of staying present, of
                  being in the moment. This practice has not only enriched my
                  personal life but also my professional one. It enables me to
                  stay focused, handle the pressures of coding challenges, and
                  maintain a harmonious work-life balance.
                </p>
              </section>
              <section className='my-10'>
                <h2 className='text-4xl mb-4'>The Future</h2>
                <p className='leading-[3rem] text-lg'>
                  As technology evolves, so do I. My interest in generative AI
                  and its applications in the creative field is driving me
                  toward exploring new dimensions. In the end, I'm just a guy
                  who loves to solve problems, enjoys the process of creation,
                  and is excited about what technology can do to make our lives
                  better. If you have a project you'd like to discuss or just
                  want to chat about the latest in tech, feel free to get in
                  touch. I'm always up for a good conversation.
                </p>
              </section>
            </article>
          </div>
          <div className='flex sm:block items-center justify-center'>
            <Image
              alt='Damjan Radev fullstack developer'
              src={'/me.jpg'}
              width={300}
              height={300}
              className='rounded-2xl md:sticky top-20'
            />
          </div>

          <h3 className='mt-20  text-3xl text-secondary text-center md:col-span-2'>
            Welcome to my world. Let's build something amazing together.
            {/* <button className='btn'>Hire me</button> */}
          </h3>
        </div>
        {/* <MoreStories className="" posts={posts} /> */}
      </div>
    </Layout>
  );
};

export default About;

export const getStaticProps = async () => {
  const data: any = await getAllArticles(BLOG_DATABASE_ID);

  const postsPromises = data.map(async (post) => {
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
      coverImage: post.properties.CoverImage.files[0].file
        ? post.properties.CoverImage.files[0].file.url
        : post.properties.CoverImage.files[0].name,
      excerpt: post.properties.Excerpt.rich_text[0].plain_text,
      publishDate: post.properties.PublishDate.created_time,
      editDate: post.properties.LastEdited.last_edited_time,
      content
    };
  });

  const posts = await Promise.all(postsPromises);
  const latestPost = posts.find(
    (post) =>
      post.publishDate ===
      posts.sort((a, b) => b.publishDate - a.publishDate)[0].publishDate
  );

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
