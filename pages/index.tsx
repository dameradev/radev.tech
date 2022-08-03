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
import FadeIn from 'react-fade-in/lib/FadeIn'
import HomePageContent from '../components/HomePageContent'
import { getAllArticles, getArticlePage, getBlocks, getPublishedArticles, notion } from '../lib/notion'
import slugify from 'slugify'

export default function Index({ posts, tags, preview, wpPosts, }) {
  const heroPost = posts[0]
  const morePosts = posts.slice(1)
  // console.log(heroPost['_embedded']?.author)

console.log(posts)


  return (
    <>

      <Layout preview={preview}>

        <Container className="">
          <FadeIn>


            <HomePageContent heroPost={heroPost} posts={morePosts} tags={[]} />

          </FadeIn>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  // const posts = (await getAllPostsForHome(preview)) || []
  // const tags = await getTags();

  // const wpPosts = await getPosts();

  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID);

  // // console.log()
  // const block = await getBlocks(data[0].id)
  // const page = await notion.pages.retrieve({page_id: data[0].id})
  // console.log(data[0].id)
  // console.log(page,'page')

  // const response = await notion.databases.query({
  //   database_id:"59d5a9a6217c4aa0ad2142cce56fbfc2",
  // });
  // response.results.forEach(result => console.log(result))
  
  const posts = data.map(post => {
    // console.log(post.properties.Excerpt)
    console.log(post.properties.CoverImage.files,'test')
    return {
      id: post.id,
      title: post.properties.Name.title[0].plain_text,
      slug: slugify(post.properties.Name.title[0].plain_text.toLowerCase()),
      publishDate: post.created_time,
      coverImage: post.properties.CoverImage.files[0].file ? post.properties.CoverImage.files[0].file.url : post.properties.CoverImage.files[0].name,
      excerpt: post.properties.Excerpt.rich_text[0].plain_text,
      // excerpt: "",
    }
  })



  // const page: any = getArticlePage(data, '5-custom-developer-blogs-i-found-inspiration-from');
  // console.log(page,'page')

  // articles.forEach(article =>console.log(article.properties.Author[0]))
  return {
    props: { preview, posts },
  }
}
