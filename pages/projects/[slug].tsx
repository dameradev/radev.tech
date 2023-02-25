import React from 'react';
import { FaLink } from 'react-icons/fa';
import { GetStaticPaths } from 'next';
import slugify from 'slugify';

// COMPONENTS
import Container from '@/components/Container';
import Layout from '@/components/Layout';
import PostContent from '@/components/PostContent';
import SlideShow from '@/components/Slideshow';

// UTILS
import {
  getAllPortfolioProjects,
  getArticlePage,
  getImageForPortfolio,
  notion,
} from '@/lib/notion';
import { getContentBlocks } from '@/lib/utils';
import { PORTFOLIO_DATABASE_ID } from '@/lib/constants';

const Project = ({ preview, content, title, images, technologies, url }) => {
  return (
    <Layout preview={preview}>
      <Container className=''>
        <div className='flex items-center justify-between mt-10'>
          <h1 className='text-5xl  text-center'>{title}</h1>
          <a
            href={url}
            target='_blank'
            className='text-white bg-secondary text-xs font-medium border-2 border-skin-secondary px-3 py-2 rounded-full uppercase cursor-pointer flex gap-2'
          >
            <FaLink /> View website
          </a>
        </div>

        <ul className='flex flex-wrap gap-4 justify-center mt-10'>
          {technologies?.map((item) => (
            <span className='keep-all uppercase bg-slate-400 rounded-md px-4 py-1'>
              {item}
            </span>
          ))}
        </ul>

        <div className='flex items-center w-full justify-center pt-20 pb-5'>
          <SlideShow slideshowData={images} className='px-20' />
        </div>
        <div className=' flex justify-center flex-col items-center min-w-full '>
          <PostContent className='max-w-[50rem] text-left' content={content} />
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  const data: any = await getAllPortfolioProjects(PORTFOLIO_DATABASE_ID);

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

  const data: any = await getAllPortfolioProjects(
    PORTFOLIO_DATABASE_ID
  );
  const page: any = getArticlePage(data, slug);

  const imagePromises = await page.properties.images.relation.map(
    async ({ id }) => await getImageForPortfolio(id)
  );
  const images = await (
    await Promise.all(imagePromises).then((fulfilled) => fulfilled)
  ).map((image) => image.files[0].name);

  articleTitle = page.properties.Name.title[0].plain_text;

  const content = await getContentBlocks({ page, notion });

  return {
    props: {
      content,
      title: articleTitle,
      technologies: page.properties.Technologies.multi_select.map(
        (item) => item.name
      ),
      slug,
      coverImage,
      images,
      url: page.properties.url.url,
    },
    revalidate: 30,
  };
};

export default Project;
