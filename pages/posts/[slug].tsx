import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { GetStaticPaths } from 'next';

// EXTERNAL LIBS
import slugify from 'slugify';
import FadeIn from 'react-fade-in/lib/FadeIn';

// COMPONENTS
import Container from '@/components/Container';
import PostHeader from '@/components/PostHeader';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import PostContent from '@/components/PostContent';
import Comments from '@/components/Comments';

// UTILS
import { supabaseClient } from '@/lib/hooks/useSupabase';
import { getAllArticles, getArticlePage, notion } from '@/lib/notion';
import { getTimeToRead } from '@/lib/timeToRead';
import { getContentBlocks } from '@/lib/utils';

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
  return (
    <Layout preview={preview}>
      <Seo title={title} description={excerpt} />
      <FadeIn>
        <Container className='grid grid-cols-8 relative p-0'>
          <div className='col-span-8 md:col-span-12 lg:col-span-5 md:mx-5 px-4 md:px-0 relative'>
            <PostHeader
              title={title}
              coverImage={coverImage}
              slug={slug}
              timeToRead={timeToRead}
              date={publishDate}
              editDate={editDate}
            />
            <PostContent content={content} />
            <Comments slug={slug} />
          </div>
        </Container>
      </FadeIn>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID);

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

  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID);
  const page: any = getArticlePage(data, slug);

  const response = await supabaseClient
    .from('posts')
    .select('view_count')
    .filter('slug', 'eq', slug);

  const totalViews = response.data[0]?.view_count || 0;

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
      coverImage,
      summary,
      totalViews,
    },
    revalidate: 30,
  };
};


export default Post;
