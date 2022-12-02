import { GetStaticPaths } from 'next';
import Image from 'next/image';
import React from 'react';
import { FaLink } from 'react-icons/fa';
import slugify from 'slugify';
import Container from '../../components/Container';
import Layout from '../../components/Layout';
import PostContent, { renderBlocks } from '../../components/PostContent';
import SlideShow from '../../components/Slideshow';
import { supabaseClient } from '../../lib/hooks/useSupabase';
import { getAllArticles, getAllPortfolioProjects, getArticlePage, getImageForPortfolio, notion, slugifyResult } from '../../lib/notion';

const Project = ({ preview, content, page, images, technologies, url }) => {
  return (
    <Layout preview={preview}>
      <Container className="">

        <h1 className='text-5xl pt-10'>{page?.properties.name.title[0].plain_text}</h1>
        <p className='text-xl pt-4'>{page?.properties.description?.rich_text[0]?.plain_text}</p>

        {content?.map((block) => (
          <div className={`post-content `}>
            {renderBlocks(block)}
          </div>
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
          property: "Resource",
          relation: {
            contains: "1b38f3d8c7214dc4be45d138107ff5b4"
          }
        }
      ]

    }
  });






  response?.results?.forEach((result: any) => {
    if (result.object === 'page') {

      paths.push({
        params: {
          slug: slugify(
            result.properties.name.title[0].plain_text
          ).toLowerCase()
        }
      });
    }
  });

  
  return {
    paths,
    fallback: 'blocking'
  };

};

export const getStaticProps = async ({ params: { slug } }) => {

  
  const response = await notion.databases.query({
    database_id: process.env.NOTES_DATABASE,

    filter: {
      or: [
        {
          property: "Resource",
          relation: {
            contains: "1b38f3d8c7214dc4be45d138107ff5b4"
          }
        }
      ]

    }
  });



  let page: any;

  response.results.find((page: any) => slugifyResult(page?.properties.name.title[0].plain_text) === slug);
  console.log(page)

  let content;
  if (page) {

    let blocks = await notion.blocks.children.list({
      block_id: page?.id
    });

    content = [...blocks.results];

    while (blocks.has_more) {
      blocks = await notion.blocks.children.list({
        block_id: page?.id,
        start_cursor: blocks.next_cursor
      });

      content = [...content, ...blocks.results];
    }
  }

  return { props: { page: page || null, content: content || null } }


};

export default Project;
