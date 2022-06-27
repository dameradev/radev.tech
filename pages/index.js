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
import FadeIn from 'react-fade-in/lib/FadeIn'

export default function Index({ posts, tags, preview, wpPosts, }) {
  const heroPost = wpPosts[0]
  const morePosts = wpPosts.slice(1)
  console.log(heroPost['_embedded']?.author)




  return (
    <>

      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <FadeIn>


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
            <ul className="flex gap-4 mt-10 lg:mt-20 flex-wrap">
              <a className="rounded-full border-[1px] px-6 py-2 text-xs text-secondary border-secondary">
                ALL TAGS
              </a>
              {tags.map(tag => (
                <Link href={tag.slug}>
                  <a key={tag.name} className="rounded-full border-[1px] px-6 py-2 text-xs  uppercase">
                    {tag.name}
                  </a>
                </Link>
              ))}

            </ul>

            <hr className="mt-10" />

            <div className='md:grid grid-cols-8 '>
              <div className='col-span-6 md:pr-6'>
                {wpPosts.length > 0 && <MoreStories posts={morePosts} />}
              </div>

              <Sidebar tags={tags} />
            </div>

          </FadeIn>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const posts = (await getAllPostsForHome(preview)) || []
  const tags = await getTags();

  const wpPosts = await getPosts();

  return {
    props: { posts, tags, preview, wpPosts },
  }
}
