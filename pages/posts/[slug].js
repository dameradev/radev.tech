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
import PostTitle from 'components/post-title'
import Head from 'next/head'
import { CMS_NAME } from 'lib/constants'
import styled from 'styled-components'
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import { useEffect, useState } from 'react'
import Sidebar from 'components/sidebar'


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

  /* .table-contents {
    height: 100vh;
  } */

  p {
    margin: 1rem 0;
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

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()

  // console.log(post.content.split('h3'))
  // console.log(typeof post.content)
  // console.log( post.content.html.split('h3'))
  useEffect(() => {
    prism.highlightAll();
  }, []);

  const [nestedHeadings, setNestedHeadings] = useState([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelector('.post-content').querySelectorAll("h3")
    );

    // const newNestedHeadings = getNestedHeadings(headingElements);
    headingElements.map((heading, index) => {
      heading.id = `heading-${index}`;
      heading.className = "heading";
    })
    setNestedHeadings(headingElements);
  }, []);




  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container className="grid grid-cols-8 relative">
        {/* <Header /> */}
        <div className='relative col-span-2'>

          <div className='pt-14 flex flex-col  sticky top-30 table-contents'>
            <p className='text-xl mb-4 font-bold'>Jump to</p>
            <ul >

              {nestedHeadings.map((heading, index) => (
                <li>

                  <a href={`#${heading.id}`}>{heading.innerText}</a>
                </li>

              ))}
            </ul>
          </div>
        </div>

        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (

          <PostStyled className="col-span-4">
            <Head>
              <title>
                {post.title} | Next.js Blog Example with {CMS_NAME}
              </title>
              {/* <meta property="og:image" content={post.ogImage.url} /> */}
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              authors={post.authors}
            />
            <PostBody content={post.content} />

          </PostStyled>


        )}
        <Sidebar tags={[{ name: "React" }]} />



        <SectionSeparator className="col-span-8" />
        {morePosts.length > 0 && (
          <div className='col-span-8'>
            {/* <h2 className="mt-12 mb-12 text-5xl md:text-6xl leading-tight md:hidden">
                  More Content
                </h2> */}
            <MoreStories className="border-none pr-0 md:grid-cols-3"  posts={morePosts} />
          </div>)
        }

      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview)
  return {
    props: {
      preview,
      post: data.post,
      morePosts: data.morePosts || [],
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPostsWithSlug()
  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  }
}
