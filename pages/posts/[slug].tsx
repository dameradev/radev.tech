import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/Container'
import PostBody from '../../components/PostBody'
import MoreStories from '../../components/MoreStories'
import Header from '../../components/Header'
import { Client } from "@notionhq/client"
import PostHeader from '../../components/PostHeader'
import Highlight, { defaultProps } from 'prism-react-renderer';
import slugify from 'slugify';

import { useCopyToClipboard } from "../../lib/hooks/useCopyToClipboard";

import PostTitle from '../../components/PostTitle'
import Head from 'next/head'
// import theme from "prism-react-renderer/themes/nightOwl";
import vsDark from "prism-react-renderer/themes/vsDark";
import vsLight from "prism-react-renderer/themes/vsLight";

// import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import { useEffect, useRef, useState, createRef, Fragment, useContext } from 'react'



// import { data } from 'autoprefixer'

import FadeIn from 'react-fade-in/lib/FadeIn'

import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/outline"

import readingTime from 'reading-time'
import SectionSeparator from '../../components/SectionSeparator'

import styled from "styled-components"
import Layout from '../../components/Layout'
import Comment from '../../components/Comment'
import Sidebar from '../../components/Sidebar'
// import { getPost, getSlugs, getTags, postComment } from '../../lib/wordpress'
import { supabaseClient } from '../../lib/hooks/useSupabase'
import { device } from '../../styles/deviceSIzes'
import Seo from '../../components/Seo'
import { GetStaticPaths } from 'next'
import { getAllArticles, getArticlePage, notion } from '../../lib/notion'
import Image from 'next/image'
import { PostStyled } from '../../styles/PostPageStyles'
import { FaCopy } from 'react-icons/fa'
import { ThemeContext } from '../../lib/themeContext'
import PostContent from '../../components/PostContent'
import { getTimeToRead } from '../../lib/timeToRead'


export default function Post({ post, morePosts, preview, tags, totalViews: staticTotalViews, content,
  title,
  publishDate,
  editDate,
  slug,
  coverImage,
  excerpt,
  summary, }) {
  const router = useRouter()
// /
  // console.log(publishDate, editDate)

  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // state for total views
  const [totalViews, setTotalViews] = useState(staticTotalViews);

  useEffect(() => {
    fetch(`/api/views/${slug}`, {
      method: 'POST',
    });
  }, [slug]);


  const timeToRead = getTimeToRead(content)

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Seo title={title} description={excerpt} />
      <FadeIn>
        <Container className="grid grid-cols-8 relative p-0">

          <div className="col-span-8 md:col-span-12 lg:col-span-5 md:mx-5 px-4 md:px-0 relative" >

              <PostHeader
                title={title}
                coverImage={coverImage}
                slug={slug}
                timeToRead={timeToRead}
                date={publishDate}
                editDate={editDate}
              />
              <PostContent content={content} />
          </div>



        </Container>
      </FadeIn>
    </Layout>
  )
}
//hey Next, these are the possible slugs

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

  // console.log(paths)
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

  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID);
  const page: any = getArticlePage(data, slug);


  

//  console.log(page.properties)

  const response = await supabaseClient
    .from('posts')
    .select('view_count')
    .filter('slug', 'eq', slug);
  // console.log(response)
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


  // console.log(page.properties.test.files.name)
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
      totalViews
      // moreArticles,
      // profilePicture,
      // sponsoredArticleUrl
    },
    revalidate: 30
  };
};


export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value, index) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text
    } = value;
    return (
      <span
        key={index}
        className={[code && "bg-code px-2 py-[2px] rounded-md text-md md:text-lg text-white "].join()}
        // className={[
        //   bold ? 'font-bold' : null,
        //   italic ? 'font-fancy text-black dark:text-white' : null,
        //   code
        //     ? ''
        //     : null,
        //   strikethrough ? 'line-through' : null,
        //   underline ? 'underline' : null
        // ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

