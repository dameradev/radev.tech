import { GetStaticPaths } from 'next';
import Image from 'next/image';
import React from 'react';
import { FaLink } from 'react-icons/fa';
import slugify from 'slugify';
import Container from '../../components/Container';
import Layout from '../../components/Layout';
import PostContent from '../../components/PostContent';
import SlideShow from '../../components/Slideshow';
import { supabaseClient } from '../../lib/hooks/useSupabase';
import { getAllArticles, getAllPortfolioProjects, getArticlePage, getImageForPortfolio, notion } from '../../lib/notion';

const Project = ({ preview, content, title, images, technologies, url }) => {
  return (
    <Layout preview={preview}>
      <Container className="">
        <div className="flex items-center justify-between mt-10" >

          <h1 className="text-5xl  text-center">{title}</h1>
          <a href={url} target="_blank" className="text-white bg-secondary text-xs font-medium border-2 border-skin-secondary px-3 py-2 rounded-full uppercase cursor-pointer flex gap-2"><FaLink /> View website</a>
        </div>
        
        <ul className='flex flex-wrap gap-4 justify-center mt-10'>
          {technologies?.map(item => <span className='keep-all uppercase bg-slate-400 rounded-md px-4 py-1'>{item}</span>)}
        </ul>
        {/* {images.map(image=><Image src={image} layout="responsive" height="100%" width="100%"/>)} */}
        <div className='flex items-center w-full justify-center pt-20 pb-5'>
          <SlideShow slideshowData={images} className="px-20" />
        </div>
        <div className=" flex justify-center flex-col items-center min-w-full "><PostContent className='max-w-[50rem] text-left' content={content} /></div>
      </Container>
    </Layout>
  );
};


export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID);


  data.forEach((result) => {
    if (result.object === 'page') {
      console.log(result.properties, 'here')
      paths.push({
        params: {
          slug: slugify(
            result.properties.Name.title[0].plain_text
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
  let content = [];
  let articleTitle = '';
  let publishedDate = null;
  let lastEditedAt = null;
  let coverImage = null;
  let sponsoredArticleUrl = null;
  let summary = null;

  // const profilePicture = await getTwitterProfilePicture();


  // const notion = new Client({
  //   auth: process.env.NOTION_SECRET
  // });

  const data: any = await getAllPortfolioProjects(process.env.PORTFOLIO_DATABASE_ID);
  const page: any = getArticlePage(data, slug);
  // const pagedata: any = await getPortfolioPage(page.id)
  // console.log(,"pagedat")
  // page.properties.images.relation.map(({id}) => getImageForPortfolio(page.id, id))
  const imagePromises = await page.properties.images.relation.map(async ({ id }) => await getImageForPortfolio(id))
  const images = await (await Promise.all(imagePromises).then(fulfilled => fulfilled)).map(image => image.files[0].name)



  const response = await supabaseClient
    .from('posts')
    .select('view_count')
    .filter('slug', 'eq', slug);
  console.log(response)
  const totalViews = response.data[0]?.view_count || 0;


  articleTitle = page.properties.Name.title[0].plain_text;


  let blocks = await notion.blocks.children.list({
    block_id: page.id
  });

  content = [...blocks.results];

  while (blocks.has_more) {
    blocks = await notion.blocks.children.list({
      block_id: page.id,
      start_cursor: blocks.next_cursor
    });

    content = [...content, ...blocks.results];
  }

  return {
    props: {
      content,
      title: articleTitle,
      // excerpt: page.properties.Excerpt.rich_text[0].plain_text,
      // publishDate: page.properties.PublishDate.created_time,
      // editDate: page.properties.LastEdited.last_edited_time,
      technologies: page.properties.Technologies.multi_select.map(item => item.name),
      slug,
      coverImage,
      // summary,
      totalViews,
      images,
      url: page.properties.url.url

      // moreArticles,
      // profilePicture,
      // sponsoredArticleUrl
    },
    revalidate: 30
  };
};

export default Project;