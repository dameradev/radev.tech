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

          <div className="col-span-8 md:col-span-6 lg:col-span-5 md:mr-5 px-8 md:px-0" >
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
              {content.map((block) => (
                <div >
                  {renderBlocks(block)}
                  {/* dame   */}
                  {/* {console.log(block)} */}
                </div>
              ))}


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
        className={[code && "bg-code px-2 py-[2px] rounded-md text-lg text-white "].join()}
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

export function renderBlocks(block) {
  const { type, id } = block;
  const value = block[type];

  if (type === "bulleted_list_item") {
    console.log(value)
  }

  switch (type) {
    case 'paragraph':
      return (
        <p className='my-4 text-xl leading-16' >
          <Text text={value.text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1 className='text-8xl'>
          {value.text[0].text.content}
        </h1>
      );
    case 'heading_2':
      return (
        <h2 className='md:text-3xl lg:text-4xl mt-12'>
          {value.text[0].text.content}
        </h2>
      );
    case 'heading_3':
      return (
        <h3 className="text-2xl mt-6">
          {value.text[0].text.content}
        </h3>
      );
    
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li className='ml-4 mt-2 list-inside marker:hidden'>
          <Text text={value.text} />
          {value.children?.map((block) => (
            <div key={block.id}>{renderBlocks(block)}</div>
          ))}
        </li>
      );
    case 'to_do':
      return (
        <div>
          <label
            htmlFor={id}
            className="flex items-center justify-start space-x-3"
          >
            <input
              id={id}
              aria-describedby={value.text}
              name={id}
              type="checkbox"
              className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
            />
            {value.text}
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            {value.text}
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return <p>{value.title}</p>;
    case 'image':
      const src =
        value.type === 'external' ? value.external.url : value.file.url;
      const caption =
        value.caption.length >= 1 ? value.caption[0].plain_text : '';
      return (
        <figure className="mt-0">

          <Image
            className="rounded-xl"
            objectFit="fill"
            width={1200}
            height={684}
            alt={
              caption
                ? caption
                : 'A visual depiction of what is being written about'
            }
            src={src}
          />
          {caption && (
            <figcaption className="text-center">{caption}</figcaption>
          )}
        </figure>
      );
    case 'code':
      return (
        <CodeBlock
          fileName={value.caption?.[0]?.plain_text}
          language={value.language}
          code={value.text[0].text.content}
        />
      );
    case 'callout':
      return (

        <div className="flex p-3 space-x-4 bg-gray-100 rounded-lg bg-info-window" >
          {value.icon && <span>{value.icon.emoji}</span>}
          <div>
            <Text text={value.text} />
          </div>
        </div>
      );
    case 'embed':
      const codePenEmbedKey = value.url.slice(value.url.lastIndexOf('/') + 1);
      return (
        <div>
          <iframe
            height="600"
            className="w-full"
            scrolling="no"
            title="Postage from Bag End"
            src={`https://codepen.io/braydoncoyer/embed/preview/${codePenEmbedKey}?default-tab=result`}
            frameBorder="no"
            loading="lazy"
            allowFullScreen={true}
          >
            See the Pen <a href={value.url}>Postage from Bag End</a> by Braydon
            Coyer (<a href="https://codepen.io/braydoncoyer">@braydoncoyer</a>)
            on <a href="https://codepen.io">CodePen</a>.
          </iframe>
        </div>
      );
    case 'table_of_contents':
      return <div>TOC</div>;
    case 'video':
      return "test"//<YoutubeEmbed url={value.external.url} />;
    case 'quote':
      return (
        <blockquote className="p-4 rounded-r-lg">
          {/* <Text text={value.text} /> */}
        </blockquote>
      );
    case 'divider':
      return (
        <hr className="my-16 w-full border-none text-center h-10 before:content-['∿∿∿'] before:text-[#D1D5DB] before:text-2xl"></hr>
      );
    default:
      return `❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type
        })`;
  }
}

const RE = /{([\d,-]+)}/;
const calculateLinesToHighlight = (meta) => {
  if (!RE.test(meta)) {
    return () => false;
  }
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)));
  return (index) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    );
    return inRange;
  };
};


export const CodeBlock = ({ code, language, metastring = "", fileName }) => {
  const [isCopied, handleCopy] = useCopyToClipboard(1000, code);
  const shouldHighlightLine = calculateLinesToHighlight(metastring);


  const { toggle } = useContext(ThemeContext)
  let languageFormatted, color;
  switch (language) {
    case "javascript":
      languageFormatted = "JS"
      color = "text-yellow-500"

      break;
    case "typescript":
      languageFormatted = "TS"
      color = "text-blue-400"
      break;
    case "css":
      languageFormatted = "CSS"
      color = "text-blue-400"
      break;
    case "markup":
      languageFormatted = "HTML"
      color = "text-orange-600"
      break;
    default:
      languageFormatted = language
      color = "text-secondary"
      break;
  }

  return (
    <div>
      <Highlight
        {...defaultProps}
        code={code}
        language={language}
        theme={toggle ? vsDark : vsLight}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div className={`relative not-prose my-10 ${!toggle ? "border-red-100 border-[1px]" : ""}`} >
            <pre
              className={`rounded-xl relative overflow-hidden bg-slate-800 ${className}`}
              style={style}
            >
              <div className="relative flex text-xs leading-6 ">
                <div className="flex items-center  px-4 pt-1 mt-2  border-t border-b border-t-transparent border-b-slate-400 w-full justify-between">
                  <p className={`${toggle ? "bg-zinc-800" : "bg-zinc-200"} h-full pt-2 pb-2 px-4`}><span className={color}>{JSON.stringify(languageFormatted).replace(/['"]+/g, '').toUpperCase()}</span> <span className='text-current'>{fileName}</span></p>
                  <button
                    className={`hidden md:inline-block group mb-2 mr-1 ${isCopied ? 'text-secondary' : 'text-gray-400'}`}
                    onClick={() => handleCopy()}
                  >
                    <span className="sr-only">Copy code</span>
                    <FaCopy />
                  </button>
                </div>
              </div>
              <div className="relative w-auto p-5 overflow-auto prose text-gray-300 prose-full-width text-sm md:text-md">
                <span>
                  {tokens.map((line, i) => {
                    const lineProps = getLineProps({ line, key: i });

                    if (shouldHighlightLine(i)) {
                      lineProps.className = `${lineProps.className} highlight-line`;
                    }

                    return (
                      <div key={i} {...lineProps}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    );
                  })}
                </span>
              </div>
              {/* Show fade on side of codeblock if content overflows */}
              <div className="absolute w-8 top-[45px] right-0 bg-gradient-to-l from-midnight code-fade"></div>
            </pre>
          </div>
        )}
      </Highlight>
    </div>
  );
};
