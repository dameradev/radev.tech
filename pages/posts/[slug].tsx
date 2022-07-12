import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/Container'
import PostBody from '../../components/PostBody'
import MoreStories from '../../components/MoreStories'
import Header from '../../components/Header'
import PostHeader from '../../components/PostHeader'



import PostTitle from '../../components/PostTitle'
import Head from 'next/head'

import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import { useEffect, useRef, useState, createRef } from 'react'

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
import { getPost, getSlugs, getTags, postComment } from '../../lib/wordpress'
import { supabaseClient } from '../../lib/hooks/useSupabase'
import { device } from '../../styles/deviceSIzes'

const PostStyled = styled.article`
  padding:0 2rem;
  .post-content {
    display: flex;
    flex-direction:column;
    img {
      align-self: center !important;
      margin: 2rem 0;
      background: var(--color-background);
    }
    a {
      color: #FFA700;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  


  .heading {
    font-size: 4rem;
    line-height: 5rem;
    margin: 2rem 0;
    &:target {
      scroll-margin-top: 100px;
    }
  }


  p {
    margin: 1rem 0;
    &.m-0 {
      margin: 0;
    }
  }

  ul {
    list-style: disc;
    
    padding-left: 2rem;
    li {
      margin: 1rem 0;
      @media ${device.tablet} {
        margin-left: 1rem;
        
      }
      ul {
        margin-left: 2rem;
        margin-bottom: 2rem;
        list-style: circle;
      }
    }
  }


  div.bg-info-window {
    margin: 2rem 0;
    background: var(--color-info-window);
    border-radius: 10px;
  }

  pre {
    min-width: 100%;
    max-height: 100vh;
    margin-top:0;
    background: var(--color-code);
    box-shadow: 0 4px 12px rgba(0,0,0,.38);
    font-size: 1.2rem;
    /* margin-top: 6rem !important; */
    position: relative;

    code {
      padding: 0;
      margin: 0;
    }
    

    button {
      background: var(--primary);
    }
  }


    code {
      background: var(--color-code);
      padding: 0.3rem 1rem;
      border-radius: 5px;
      /* margin-right: 0.5rem; */
      font-size:1.6rem;
    }


  .file-name {
    margin-top: 2rem;
    font-style: italic;
    text-align: right;
  }

  img {
    align-self: center;
  }

  .wp-block-image {
    display: flex;
    
    justify-content: center;
  }
  /* span.error {
    color: red;
  }

  figcaption {
    font-style: italic;
  }

  figure.kg-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem;
  }

  .error-container {
    margin: 1rem 0;
    padding: 1rem 0;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
    p {
      margin-bottom: 1rem;

      display: flex;
      justify-content: space-between;
    }
  } */
`

export default function Post({ post, morePosts, preview, tags, totalViews: staticTotalViews }) {
  const router = useRouter()

  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // state for total views
  const [totalViews, setTotalViews] = useState(staticTotalViews);

  useEffect(() => {
    prism.highlightAll();
  }, []);
  const timeToRead = readingTime(post.content.rendered.replace(/<[^>]+>/g, ''));
  console.log(timeToRead)

  const [nestedHeadings, setNestedHeadings] = useState([]);
  const [elementAdded, setElementAdded] = useState(false);


  // console.log(post)
  useEffect(() => {
    fetch(`/api/views/${post.slug}`, {
      method: 'POST',
    });

    // fetch(`/api/views/${post.slug}`, {
    //   method: 'GET',
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     setTotalViews(data.total)
    //   })

  }, [post.slug]);


  useEffect(() => {
    if (!elementAdded) {
      document.querySelectorAll(".wp-block-code").forEach(function (block: any) {
        // block.appendChild(document.createElement("p").innerHTML = `${block.title}`);
        let fileName = document.createElement("p") as any;
        const code = block.querySelector("code")

        let fileNameText;
        fileName.classList = "w-fit top-[-30px] left-0 m-0 px-4 py-2 bg-code shadow-slate-800 text-white"
        fileName.style = "box-shadow: 4px 0 10px -10px #010101;"
        switch (code.lang) {
          case "javascript":
            fileNameText = "JS"
            // fileName.classList.add("text-yellow-400")
            fileName.innerHTML = `<span class="text-yellow-400">${fileNameText}</span> ${block.title}`
            break;
          case "typescript":
            fileNameText = "TS"
            fileName.innerHTML = `<span class="text-blue-400">${fileNameText}</span> ${block.title}`
            break;
          case "css":
            fileNameText = "CSS"
            fileName.innerHTML = `<span class="text-blue-600">${fileNameText}</span> ${block.title}`
            break;
          case "markup":
            fileNameText = "HTML"
            fileName.innerHTML = `<span class="text-orange§-600">${fileNameText}</span> ${block.title}`
            break;
          default:
            fileNameText = code.lang.toUpperCase()
            fileName.innerHTML = `<span class="text-secondary">${fileNameText}</span> ${block.title}`
            break;
        }

        block.classList.add("relative")

        block.classList.add("pt-10")

        const parentDiv = block.parentNode;
        // console.log(node)
        if (parentDiv) parentDiv.insertBefore(fileName, block)
        // document.insertBefore(fileName, block)
      })
      setElementAdded(true)
    }
  }, []);

  // useEffect(() => {


  // }, [])



  useEffect(() => {
    // block.appendChild()


    const headingElements = Array.from(
      document.querySelector('.post-content').querySelectorAll("h2")
    );

    headingElements.map((heading, index) => {
      heading.id = `heading-${index}`;
      heading.className = "heading";
    })

    setNestedHeadings(headingElements)
  }, []);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postComment(post.id, comment, name, email)
    console.log(res)
    if (res.data?.status === 400) {
      if (res.data.params?.author_email) {
        setError(res.data.params.author_email)
      } else {
        setError(res.message)
      }
    } else {
      setComment('');
      setEmail('');
      setName('');
      setError('');
      setSuccess('Your comment has been submitted, it will show after approval!')
    }
  }





  return (
    <Layout preview={preview}>
      <FadeIn>
        <Container className="grid grid-cols-8 relative p-0">

          <TableOfContents className="relative col-span-2 hidden lg:block" nestedHeadings={nestedHeadings} />

          {/* {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : ( */}

          <div className="col-span-8 md:col-span-6 lg:col-span-4 md:mr-5" >
            <PostStyled >
              <Head>
                <title>
                  {post.title.rendered} | Next.js Blog Example with
                </title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                authors={post.authors}
                totalViews={totalViews}
                timeToRead={timeToRead}
              />
              <TableOfContents className="list-none lg:hidden" nestedHeadings={nestedHeadings} />
              <PostBody content={post.content.rendered} />


            </PostStyled>
            <form className='mt-10 mx-5 ' onSubmit={(e) => handleSubmit(e)}>
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
            </form>
            {post['_embedded']?.replies?.[0]?.map((comment, index) => {
              const repliesToComment = post['_embedded']?.replies[0].filter(reply => reply.parent === comment.id)
              return comment.parent === 0 && (
                <>
                  
                  <Comment className="" key={index} reply={false} comment={comment} hasReplies={repliesToComment.length} />
                  {repliesToComment.map((reply, index) => {
                    return <Comment key={index} hasReplies={false} className="pl-6" reply comment={reply} />
                  })}
                </>
              )
            })}
          </div>



          {/* )} */}

          

          <Sidebar className="col-span-8" tags={tags} />



          <SectionSeparator className="col-span-8" />
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
export async function getStaticPaths() {
  const paths = await getSlugs('posts');


  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: 'blocking',
  };
}

//access the router, get the id, and get the data for that post
export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);

  const response = await supabaseClient
    .from('posts')
    .select('view_count')
    .filter('slug', 'eq', params.slug);
  const totalViews = response.data[0]?.view_count || 0;

  console.log(post)

  return {
    props: {
      post,
      totalViews,
      tags: await getTags()
    },
    revalidate: 60, // In seconds
  };
}