import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from 'components/container'
import PostBody from 'components/post-body'
import MoreStories from 'components/more-stories'
import Header from 'components/header'
import PostHeader from 'components/post-header'
import SectionSeparator from 'components/section-separator'
import Layout from 'components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from 'lib/graphcms'
import PostTitle from 'components/PostTitle'
import Head from 'next/head'
import { CMS_NAME } from 'lib/constants'
import styled from 'styled-components'
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import { useEffect, useRef, useState, createRef } from 'react'
import Sidebar from 'components/sidebar'
import { getPost, getSlugs, getTags } from 'lib/wordpress'
import { device } from 'styles/deviceSIzes'


const PostStyled = styled.article`

  .post-content {
    display: flex;
    flex-direction:column;
    img {
      align-self: center !important;
      margin: 2rem 0;
      background: #fff;
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
  }

  ul {
    list-style: disc;
    
    
    li {
      margin: 1rem 0;
      @media ${device.tablet} {
        margin-left: 1rem;
      }
      ul {
        margin-left: 4rem;
        margin-bottom: 2rem;
        list-style: circle;
      }
    }
  }


  pre {
    min-width: 100%;
    button {
      background: var(--primary);
    }
  }

  .file-name {
    margin-top: 2rem;
    font-style: italic;
    text-align: right;
  }

  span.error {
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
  }
`
const TableOfContents = styled.div`
  li {
    
    position: relative;

    &:not(:first-of-type) {
      margin: 1rem 0;
    }
    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 7px;
      left: -18px;
      width: 10px;
      height: 10px;
      border: 1px solid var(--color-text);
      border-radius: 50%;

      &.active {
        background: var(--color-secondary);
        border: none;
      }
    }
  }
`
export default function Post({ post, morePosts, preview, tags }) {
  const router = useRouter()

  
  useEffect(() => {
    prism.highlightAll();
  }, []);

  const [nestedHeadings, setNestedHeadings] = useState([]);

  useEffect(() => {

    const headingElements = Array.from(
      document.querySelector('.post-content').querySelectorAll("h2")
    );

    headingElements.map((heading, index) => {
      heading.id = `heading-${index}`;
      heading.className = "heading";
    })

    setNestedHeadings(headingElements)
    //   headingElements.map((heading, index) => {

    //     if (isInViewport(heading)) {
    //       const updatedNestedHeadings = [...headingElements];

    //       updatedNestedHeadings[index]?.classList.add("active");

    //       console.log(updatedNestedHeadings)
    //       if (!nestedHeadings[index]?.classList.contains('active')) {
    //         setNestedHeadings(updatedNestedHeadings);
    //       }
    //     } else {
    //       nestedHeadings[index]?.classList.remove("active");
    //     }
    //   })

    // });

  }, []);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container className="grid grid-cols-8 relative">
        <Header />
        <TableOfContents className='relative col-span-2 hidden lg:block'>

          <div className='pt-14 flex flex-col  sticky top-30 table-contents pr-4'>
            <p className='text-xl mb-4 font-bold'>Jump to</p>
            <ul >

              {nestedHeadings.map((heading, index) => (
                <li>
                  <a href={`#${heading.id}`}>{heading.innerText}</a>
                </li>

              ))}
            </ul>
          </div>
        </TableOfContents>

        {/* {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : ( */}

          <div className="col-span-8 md:col-span-6 lg:col-span-4">
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
              />
              <PostBody content={post.content.rendered} />

            </PostStyled>
            {/* <div className='mx-10'>
              <textarea placeholder='Leave a comment' className='w-full bg-skin-base text-skin-fg  border-[1px] font-bold py-2 px-4 rounded-xl cursor-not-allowed'>

              </textarea>
              <button className='text-white bg-secondary text-xs font-medium border-2 border-skin-secondary mt-4 px-6 py-2 rounded-full uppercase'>send</button>
            </div> */}

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

  return {
    props: {
      post,
      tags: await getTags()
    },
    revalidate: 10, // In seconds
  };
}