import Container from '../components/Container'
import MoreStories from '../components/MoreStories'
import HeroPost from '../components/HeroPost'
import Intro from '../components/Intro'
import Layout from '../components/Layout'
import { getAllPostsForHome, getAllTags } from '../lib/graphcms'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Sidebar from '../components/Sidebar'
import { getDate, getPosts, getFeaturedImage, getTags } from '../lib/wordpress'
import Link from 'next/link'
import FadeIn from 'react-fade-in/lib/FadeIn'
import HomePageContent from '../components/HomePageContent'

export default function Index({ posts, tags, preview, wpPosts, }) {
  const heroPost = wpPosts[0]
  const morePosts = wpPosts.slice(1)
  console.log(heroPost['_embedded']?.author)




  return (
    <>

      <Layout preview={preview}>
        
        <Container className="">
          <FadeIn>


            <HomePageContent heroPost={heroPost} posts={morePosts} tags={tags} />
            
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
