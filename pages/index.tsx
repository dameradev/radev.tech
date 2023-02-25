import React from 'react';
import slugify from 'slugify';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { ChevronDoubleDownIcon } from '@heroicons/react/outline';

// COMPONENTS
import Container from '../components/Container';
import Layout from '../components/Layout';
import HomePageContent from '../components/HomePageContent';

// UTILS
import {
  getAllArticles,
  notion,
} from '../lib/notion';
import { getContentBlocks } from '../lib/utils';

export default function Index({ posts, tags, preview, wpPosts }) {
  const heroPost = posts[0];
  const morePosts = posts.slice(1);

  return (
    <>
      <Layout preview={preview}>
        <Container className=''>
          <FadeIn>
            <div className='flex flex-col lg:flex-row items-center gap-12 md:gap-24 my-12 md:my-20 '>
              <h1 className='text-3xl md:text-4xl md:leading-[5rem] tracking-wide text-center lg:text-left'>
                Hi, I'm Damjan, a developer, blogger, working as an independent
                contractor. Sharing solutions to problems I've encountered
                throughout my journey.
              </h1>
              <img
                className='lg:h-[45rem]'
                src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Round&hairColor=Blonde&facialHairType=MoustacheFancy&facialHairColor=Blonde&clotheType=BlazerSweater&eyeType=Side&eyebrowType=RaisedExcitedNatural&mouthType=Sad&skinColor=Tanned'
              />
            </div>

            <a
              href='#hero'
              className='text-center text-4xl mb-14 py-4 w-full bg-accent-2 rounded-lg flex justify-center items-center gap-4 '
            >
              {' '}
              My Content{' '}
              <ChevronDoubleDownIcon className='w-8 animate-bounce' />{' '}
            </a>
            <HomePageContent heroPost={heroPost} posts={morePosts} tags={[]} />
          </FadeIn>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID);

  const postsPromises = data.map(async (post) => {
    const content = await getContentBlocks({ page: post, notion });

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
      content,
    };
  });

  const posts = await Promise.all(postsPromises);

  return {
    props: { preview, posts },
  };
}
