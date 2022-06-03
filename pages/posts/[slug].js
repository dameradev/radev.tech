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
import { useEffect } from 'react'

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
  useEffect(() => {
    prism.highlightAll();
  }, []);


  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <PostStyled>
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
            <SectionSeparator />
            {morePosts.length > 0 && (
              <>
                {/* <h2 className="mt-12 mb-12 text-5xl md:text-6xl leading-tight md:hidden">
                  More Content
                </h2> */}
                <MoreStories posts={morePosts} />
              </>)
            }
          </>
        )}
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
