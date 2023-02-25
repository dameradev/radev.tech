import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import slugify from 'slugify';

// COMPONENTS
import Container from '@/components/Container';
import Layout from '@/components/Layout';
import { renderBlocks } from '@/components/PostContent';

// UTILS
import {
  notion,
  slugifyResult,
} from '@/lib/notion';
import { getContentBlocks } from '@/lib/utils';

const Project = ({ preview, content, page, images, technologies, url }) => {
  return (
    <Layout preview={preview}>
      <Container className=''>
        <h1 className='text-5xl pt-4'>
          {page?.properties.name.title[0].plain_text}
        </h1>
        <p className='text-xl pt-4'>
          {page?.properties.description?.rich_text[0]?.plain_text}
        </p>

        {content?.map((block) => (
          <div className={`post-content `}>{renderBlocks(block)}</div>
        ))}
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];

  const response = await notion.databases.query({
    database_id: process.env.NOTES_DATABASE,

    filter: {
      or: [
        {
          property: 'Resource',
          relation: {
            contains: '1b38f3d8c7214dc4be45d138107ff5b4',
          },
        },
      ],
    },
  });

  response?.results?.forEach((result: any) => {
    if (result.object === 'page') {
      paths.push({
        params: {
          slug: slugify(
            result.properties.name.title[0].plain_text
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

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTES_DATABASE,

    filter: {
      or: [
        {
          property: 'Resource',
          relation: {
            contains: '1b38f3d8c7214dc4be45d138107ff5b4',
          },
        },
      ],
    },
  });

  let page: any;

  page = response.results.find(
    (page: any) =>
      slugifyResult(page?.properties.name.title[0].plain_text) === slug
  );

  let content;
  if (page) {
    content = await getContentBlocks({ page, notion });
  }

  return { props: { page: page || null, content: content || null } };
};

export default Project;
