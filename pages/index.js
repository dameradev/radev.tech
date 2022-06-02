import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome } from '../lib/graphcms'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Sidebar from 'components/sidebar'

export default function Index({ posts, preview }) {
  const heroPost = posts[0]
  const morePosts = posts.slice(1)
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>

          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}

              date={heroPost.date}
              author={heroPost.authors[0]}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          <ul className="flex gap-4 mt-20">
            <li className="rounded-full border-[1px] px-6 py-2 text-xs text-secondary border-secondary">
              ALL TAGS
            </li>
            <li className="rounded-full border-[1px] px-6 py-2 text-xs">
              TAGS
            </li>
            <li className="rounded-full border-[1px] px-6 py-2 text-xs">
              CATEGORIES
            </li>
            <li className="rounded-full border-[1px] px-6 py-2 text-xs">
              TAGS
            </li>
            <li className="rounded-full border-[1px] px-6 py-2 text-xs">
              TAGS
            </li>
            <li className="rounded-full border-[1px] px-6 py-2 text-xs">
            ALL CATEGORIES
            </li>
            <li className="rounded-full border-[1px] px-6 py-2 text-xs">
            ALL CATEGORIES
            </li>
            
          </ul>
        
        <hr className="mt-10" />
        
          <div className='grid grid-cols-8 '>
            <div className='col-span-6 pr-6'>
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </div>
            
            <Sidebar />
          </div>

        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const posts = (await getAllPostsForHome(preview)) || []
  return {
    props: { posts, preview },
  }
}
