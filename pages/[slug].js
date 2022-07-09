import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome, getAllTags } from '../lib/graphcms'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Sidebar from 'components/sidebar'
import { getDate, getPosts, getFeaturedImage, getTags, getSlugs, getPostsByTag, getTag } from 'lib/wordpress'
import Link from 'next/link'
import { useRouter } from 'next/router'

import FadeIn from 'react-fade-in/lib/FadeIn'


export default function Index({ posts, tags, preview, wpPosts, }) {
  const heroPost = wpPosts[0]
  const morePosts = wpPosts.slice(1)
  // console.log(heroPost['_embedded']?.author)


  const router = useRouter();
  // console.log(router.query)

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <FadeIn>
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
            <ul className="flex  gap-4 mt-10 lg:mt-20 flex-wrap">
              <li className="rounded-full border-[1px] px-6 py-2 text-xs ">
                <Link href='/'>
                  ALL TAGS
                </Link>
              </li>
              {tags.map(tag => (
                <li className={`rounded-full border-[1px] px-6 py-2 text-xs  uppercase  ${router.query.slug === tag.slug ? "text-secondary border-secondary" : ""}`}>
                  <Link href={tag.slug}>
                    {tag.name}
                  </Link>
                </li>
              ))}

            </ul>

            <hr className="mt-10" />

            <div className='sm:grid grid-cols-8 '>
              <div className='col-span-6 sm:pr-6'>
                {wpPosts.length > 0 && <MoreStories posts={morePosts} />}
              </div>

              <Sidebar tags={tags} />
            </div>

          </Container>
        </FadeIn>
      </Layout>
    </>
  )
}



//hey Next, these are the possible slugs
export async function getStaticPaths() {
  const paths = await getSlugs('tags');


  // paths.push({ params: { slug: "" } })

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: 'blocking',
  };
}

//access the router, get the id, and get the data for that post
export async function getStaticProps({ params }) {
  const tag = await getTag(params.slug);
  // console.log(params)

  const posts = await getPostsByTag(tag.id);


  const tags = await getTags();
  return {
    props: {
      tags,
      posts,
      wpPosts: posts
    },
    revalidate: 10, // In seconds
  };
}