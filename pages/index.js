import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome, getAllTags } from '../lib/graphcms'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Sidebar from 'components/sidebar'
import { getDate, getPosts, getFeaturedImage, getTags } from 'lib/wordpress'
import Link from 'next/link'

export default function Index({ posts, tags, preview, wpPosts, }) {
  const heroPost = wpPosts[0]
  const morePosts = posts.slice(1)
  console.log(heroPost['_embedded']?.author)



  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>


          {heroPost && (
            <HeroPost
              title={heroPost.title.rendered}
              coverImage={getFeaturedImage(heroPost)?.source_url}

              date={heroPost.date}
              // author={heroPost.authors[0]}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt.rendered}
            />
          )}
          <ul className="flex gap-4 mt-20 flex-wrap">
            <li className="rounded-full border-[1px] px-6 py-2 text-xs text-secondary border-secondary">
              ALL TAGS
            </li>
            {tags.map(tag => (
              <li className="rounded-full border-[1px] px-6 py-2 text-xs  uppercase">
                <Link href={tag.slug}>
                  {tag.name}
                </Link>
              </li>
            ))}

          </ul>

          <hr className="mt-10" />

          <div className='grid grid-cols-8 '>
            <div className='col-span-6 pr-6'>
              {wpPosts.length > 0 && <MoreStories posts={wpPosts} />}
            </div>

            <Sidebar tags={tags} />
          </div>

        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const posts = (await getAllPostsForHome(preview)) || []
  const tags = await getTags();

  const wpPosts = await getPosts();

  console.log(wpPosts.length)
  return {
    props: { posts, tags, preview, wpPosts },
  }
}
