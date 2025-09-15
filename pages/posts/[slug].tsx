import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { GetStaticPaths } from 'next';

// EXTERNAL LIBS
import slugify from 'slugify';
import FadeIn from 'react-fade-in/lib/FadeIn';

// COMPONENTS
import Container from '@/components/Container';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import PostHeader from '@/components/PostContent/PostHeader';
import PostContent from '@/components/PostContent';
import Comments from '@/components/Comments';
import TableOfContent from '@/components/PostContent/TableOfContents';
import ReactAndShare from '@/components/ReactAndShare';

// UTILS
import { supabaseClient } from '@/lib/hooks/useSupabase';
import { getAllArticles, getArticlePage, notion } from '@/lib/notion';
import { getTimeToRead } from '@/lib/timeToRead';
import { getContentBlocks } from '@/lib/utils';
import { BLOG_DATABASE_ID } from '@/lib/constants';
import generateSocialImage from '@/lib/generateSocialImage';

const Post = ({
  preview,
  content,
  title,
  publishDate,
  editDate,
  slug,
  coverImage,
  excerpt,
}) => {
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/views/${slug}`, {
      method: 'POST',
    });
  }, [slug]);

  const timeToRead = getTimeToRead(content);

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }

  const socialImageConf = generateSocialImage({
    title,
    underlayImage: coverImage.slice(coverImage.lastIndexOf('/') + 1),
    cloudName: 'dvvbls283',
    imagePublicID: 'v1677406450/Blog/og_social_large.png', // the OG template image name uploaded in Cloudinary
  });

  return (
    <Layout preview={preview}>
      <Seo
        title={title}
        description={excerpt}
        ogType='article'
        ogUrl={`https://radev.tech/posts/${slug}`}
        ogImage={socialImageConf}
      />
      <FadeIn>
        <Container className='grid grid-cols-8 relative p-0 lg:!mx-10'>
          <ReactAndShare slug={slug} title={title} className="hidden md:block" />
          <div className='col-span-8 md:col-span-12 lg:col-span-6  px-4  md:px-0 relative md:ml-32'>
            <PostHeader
              title={title}
              coverImage={coverImage}
              slug={slug}
              timeToRead={timeToRead}
              date={publishDate}
              editDate={editDate}
            />
            <TableOfContent className='' />
            <PostContent content={content} />
            <ReactAndShare slug={slug} title={title} className="flex !flex-row justify-between " />
            <Comments slug={slug} />
          </div>
        </Container>
      </FadeIn>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  const data: any = await getAllArticles(BLOG_DATABASE_ID);

  data.forEach((result) => {
    if (result.object === 'page') {
      paths.push({
        params: {
          slug: slugify(
            result.properties.Name.title[0].plain_text
          ).toLowerCase(),
        },
      });
    }
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  let articleTitle = '';
  let publishedDate = null;
  let lastEditedAt = null;
  let coverImage = null;
  let sponsoredArticleUrl = null;
  let summary = null;

  const data: any = await getAllArticles(BLOG_DATABASE_ID);
  const page: any = getArticlePage(data, slug);

  const response = await supabaseClient
    .from('posts')
    .select('view_count')
    .filter('slug', 'eq', slug);

  const totalViews = response.data?.[0]?.view_count || 0;

  articleTitle = page.properties.Name.title[0].plain_text;

  const content = await getContentBlocks({ page, notion });
  return {
    props: {
      content,
      title: articleTitle,
      excerpt: page.properties.Excerpt.rich_text[0].plain_text,
      publishDate: page.properties.PublishDate.created_time,
      editDate: page.properties.LastEdited.last_edited_time,
      slug,
      coverImage: page.properties.CoverImage.files[0].file
        ? page.properties.CoverImage.files[0].file.url
        : page.properties.CoverImage.files[0].name,
      summary,
      totalViews,
    },
    revalidate: 30,
  };
};

export default Post;
