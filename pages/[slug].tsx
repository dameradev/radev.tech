import Container from '../components/Container'
import MoreStories from '../components/MoreStories'
import HeroPost from '../components/HeroPost'
import Intro from '../components/Intro'
import Layout from '../components/Layout'
import { getAllPostsForHome, getAllTags } from '../lib/graphcms'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Sidebar from '../components/Sidebar'

import Link from 'next/link'
import { useRouter } from 'next/router'

import FadeIn from 'react-fade-in/lib/FadeIn'
import HomePageContent from '../components/HomePageContent'


export default function Index({ posts, tags, preview, wpPosts, }) {
  // const heroPost = wpPosts?.[0]
  // let morePosts = [];
  // if (wpPosts?.length > 1) {
  //   morePosts = wpPosts.slice(1)
  // }
  // console.log(heroPost['_embedded']?.author)


  const router = useRouter();
  // console.log(router.query)

  return (
    <>
      <Layout preview={preview}>
        
        <FadeIn>
          <Container className="">
            {/* <HomePageContent heroPost={heroPost} posts={morePosts} tags={tags} /> */}
          </Container>
        </FadeIn>
      </Layout>
    </>
  )
}



// //hey Next, these are the possible slugs
// export async function getStaticPaths() {
//   const paths = await getSlugs('tags');


//   // paths.push({ params: { slug: "" } })

//   return {
//     paths,
//     //this option below renders in the server (at request time) pages that were not rendered at build time
//     //e.g when a new blogpost is added to the app
//     fallback: 'blocking',
//   };
// }

// //access the router, get the id, and get the data for that post
// export async function getStaticProps({ params }) {
//   const tag = await getTag(params.slug);
//   // console.log(params)
//   let posts = []
//   if (tag?.id)
//     posts = await getPostsByTag(tag?.id);


//   const tags = await getTags();
//   return {
//     props: {
//       tags,
//       posts,
//       wpPosts: posts
//     },
//     revalidate: 60, // In seconds
//   };
// }