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

import TableOfContents from '../../components/TableOfContents'

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


export default function Post({ post, morePosts, preview, tags, totalViews: staticTotalViews, content,
  title,
  publishedDate,
  lastEditedAt,
  slug,
  coverImage,
  summary, }) {
  const router = useRouter()

  // console.log(content)

  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // state for total views
  const [totalViews, setTotalViews] = useState(staticTotalViews);

  // useEffect(() => {
  //   prism.highlightAll();
  // }, []);
  // const timeToRead = readingTime(content);
  // console.log(timeToRead)

  const [nestedHeadings, setNestedHeadings] = useState([]);
  const [elementAdded, setElementAdded] = useState(false);


  // console.log(post)
  // useEffect(() => {
  //   fetch(`/api/views/${slug}`, {
  //     method: 'POST',
  //   });

  //   // fetch(`/api/views/${post.slug}`, {
  //   //   method: 'GET',
  //   // })
  //   //   .then(res => res.json())
  //   //   .then(data => {
  //   //     setTotalViews(data.total)
  //   //   })

  // }, [slug]);


  // useEffect(() => {
  //   if (!elementAdded) {
  //     document.querySelectorAll(".wp-block-code").forEach(function (block: any) {
  //       // block.appendChild(document.createElement("p").innerHTML = `${block.title}`);
  //       let fileName = document.createElement("p") as any;
  //       const code = block.querySelector("code")

  //       let fileNameText;
  //       fileName.classList = "w-fit top-[-30px] left-0 m-0 px-4 py-2 bg-code shadow-slate-800 text-white"
  //       fileName.style = "box-shadow: 4px 0 10px -10px #010101;"
  //       switch (code.lang) {
  //         case "javascript":
  //           fileNameText = "JS"
  //           // fileName.classList.add("text-yellow-400")
  //           fileName.innerHTML = `<span class="text-yellow-400">${fileNameText}</span> ${block.title}`
  //           break;
  //         case "typescript":
  //           fileNameText = "TS"
  //           fileName.innerHTML = `<span class="text-blue-400">${fileNameText}</span> ${block.title}`
  //           break;
  //         case "css":
  //           fileNameText = "CSS"
  //           fileName.innerHTML = `<span class="text-blue-600">${fileNameText}</span> ${block.title}`
  //           break;
  //         case "markup":
  //           fileNameText = "HTML"
  //           fileName.innerHTML = `<span class="text-orange§-600">${fileNameText}</span> ${block.title}`
  //           break;
  //         default:
  //           fileNameText = code.lang.toUpperCase()
  //           fileName.innerHTML = `<span class="text-secondary">${fileNameText}</span> ${block.title}`
  //           break;
  //       }

  //       block.classList.add("relative")

  //       block.classList.add("pt-10")

  //       const parentDiv = block.parentNode;
  //       // console.log(node)
  //       if (parentDiv) parentDiv.insertBefore(fileName, block)
  //       // document.insertBefore(fileName, block)
  //     })
  //     setElementAdded(true)
  //   }
  // }, []);

  // useEffect(() => {


  // }, [])



  // useEffect(() => {
  //   // block.appendChild()


  //   const headingElements = Array.from(
  //     document.querySelector('.post-content').querySelectorAll("h2")
  //   );

  //   headingElements.map((heading, index) => {
  //     heading.id = `heading-${index}`;
  //     heading.className = "heading";
  //   })

  //   setNestedHeadings(headingElements)
  // }, []);

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const res = await postComment(post.id, comment, name, email)
  //   console.log(res)
  //   if (res.data?.status === 400) {
  //     if (res.data.params?.author_email) {
  //       setError(res.data.params.author_email)
  //     } else {
  //       setError(res.message)
  //     }
  //   } else {
  //     setComment('');
  //     setEmail('');
  //     setName('');
  //     setError('');
  //     setSuccess('Your comment has been submitted, it will show after approval!')
  //   }
  // }



  return (
    <Layout preview={preview}>
      {/* <Seo title={post.title.rendered} description={post.excerpt.rendered} /> */}
      <FadeIn>
        <Container className="grid grid-cols-8 relative p-0">

          {/* <TableOfContents className="relative col-span-2 hidden lg:block" nestedHeadings={nestedHeadings} /> */}

          {/* {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : ( */}

          <div className="col-span-8 md:col-span-6 lg:col-span-5 md:mr-5 px-4 md:px-0" >
            <div >

            <PostHeader
                title={title}
                coverImage={coverImage}
                // date={post.date}
                // authors={post.authors}
                totalViews={totalViews} timeToRead={undefined} date={undefined} authors={undefined}                // timeToRead={timeToRead}
              />
              
              {/* 
              <TableOfContents className="list-none lg:hidden" nestedHeadings={nestedHeadings} /> */}
              <PostContent content={content}/>


            </div>
            {/* <form className='mt-10 mx-5 ' onSubmit={(e) => handleSubmit(e)}>
              {error &&
                <p className='flex text-red-600 mb-4 bg-red-100 w-fit p-4'>
                  <XCircleIcon className="w-6 mr-2" />
                  {error}
                </p>
              }
              {success &&
                <p className='flex text-green-600 mb-4 bg-green-100 w-fit p-4'>
                  <CheckCircleIcon className="w-6 mr-2" />
                  {success}
                </p>
              }
              <div className='flex mb-4 gap-4'>
                <input

                  placeholder='Email'
                  className='w-full bg-skin-base text-skin-fg  border-[1px] border-slate-300 font-bold py-2 px-4 rounded-xl'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder='Name'
                  className='w-full bg-skin-base text-skin-fg  border-[1px] border-slate-300 font-bold py-2 px-4 rounded-xl'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <textarea
                placeholder='Leave a comment'
                className='w-full bg-skin-base text-skin-fg  border-[1px] border-slate-300 font-bold py-2 px-4 rounded-xl'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className='text-white bg-secondary text-xs font-medium border-2 border-skin-secondary mt-4 px-6 py-2 rounded-full uppercase'
                type='submit'
              >
                send
              </button>
            </form> */}
            {/* {post['_embedded']?.replies?.[0]?.map((comment, index) => {
              const repliesToComment = post['_embedded']?.replies[0].filter(reply => reply.parent === comment.id)
              return comment.parent === 0 && (
                <>

                  <Comment className="" key={index} reply={false} comment={comment} hasReplies={repliesToComment.length} />
                  {repliesToComment.map((reply, index) => {
                    return <Comment key={index} hasReplies={false} className="pl-6" reply comment={reply} />
                  })}
                </>
              )
            })} */}
          </div>



          {/* )} */}



          {/* <Sidebar className="col-span-8" tags={tags} /> */}



          {/* <SectionSeparator className="col-span-8" /> */}
          {/* {morePosts?.length > 0 && (
          <div className='col-span-8'>

            <MoreStories className="border-none pr-0 sm:pr-0 md:grid-cols-2 lg:grid-cols-3" posts={morePosts} />
          </div>)
        } */}

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
  // console.log(slug)     
  // console.log(page)

  // console.log(page, '[ageee')
  // const response = await notion.databases.query({
  //   database_id: process.env.BLOG_DATABASE_ID,
  // });
  // console.log(response)

  // const page: any = getArticlePage(data, slug);
  // getBlocks
  console.log(slug, 'pros')
  
  const response = await supabaseClient
    .from('posts')
    .select('view_count')
    .filter('slug', 'eq', slug);
  console.log(response)
  const totalViews = response.data[0]?.view_count || 0;

  

  articleTitle = page.properties.Name.title[0].plain_text;
  // publishedDate = page.properties.Published.date.start;
  // lastEditedAt = page.properties.LastEdited.last_edited_time;
  // // sponsoredArticleUrl = page.properties.canonicalUrl?.url;
  // summary = page.properties.Summary?.rich_text[0]?.plain_text;
  // coverImage =
  //   page.properties?.coverImage?.files[0]?.file?.url ||
  //   page.properties.coverImage?.files[0]?.external?.url ||
  //   'https://via.placeholder.com/600x400.png';

  // const moreArticles: any = await getMoreArticlesToSuggest(
  //   process.env.BLOG_DATABASE_ID,
  //   articleTitle
  // );
  // const moreArticles: any = await getMoreArticlesToSuggest(
  //   process.env.BLOG_DATABASE_ID,
  //   articleTitle
  // );

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
      publishedDate,
      lastEditedAt,
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

