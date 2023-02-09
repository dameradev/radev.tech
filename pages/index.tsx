import Container from "../components/Container";
import MoreStories from "../components/MoreStories";
import HeroPost from "../components/HeroPost";
import Intro from "../components/Intro";
import Layout from "../components/Layout";
import { getAllPostsForHome, getAllTags } from "../lib/graphcms";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import Sidebar from "../components/Sidebar";

import Link from "next/link";
import FadeIn from "react-fade-in/lib/FadeIn";
import HomePageContent from "../components/HomePageContent";
import {
  getAllArticles,
  getArticlePage,
  getBlocks,
  getPublishedArticles,
  notion,
} from "../lib/notion";
import slugify from "slugify";
import { ChevronDoubleDownIcon } from "@heroicons/react/outline";

export default function Index({ posts, tags, preview, wpPosts }) {
  const heroPost = posts[0];
  const morePosts = posts.slice(1);

  return (
    <>
      <Layout preview={preview}>
        <Container className="">
          <FadeIn>
            <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-24 my-12 md:my-20 ">
              <h1 className="text-3xl md:text-4xl md:leading-[5rem] tracking-wide text-center lg:text-left">
                Hi, I'm Damjan, a developer, blogger, working as an independent
                contractor. Sharing solutions to problems I've encountered
                throughout my journey.
              </h1>
              <img
                className="lg:h-[50rem]"
                src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Round&hairColor=Blonde&facialHairType=MoustacheFancy&facialHairColor=Blonde&clotheType=BlazerSweater&eyeType=Side&eyebrowType=RaisedExcitedNatural&mouthType=Sad&skinColor=Tanned"
              />
            </div>

            <h2 className="text-center text-4xl mb-14 py-4 w-full bg-accent-2 rounded-lg flex justify-center items-center gap-4 ">
              {" "}
              My Content{" "}
              <ChevronDoubleDownIcon className="w-8 animate-bounce" />{" "}
            </h2>
            <HomePageContent heroPost={heroPost} posts={morePosts} tags={[]} />
          </FadeIn>
        </Container>
      </Layout>
    </>
  );
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

  const postsPromises = data.map(async (post) => {
    // console.log(post.properties.Excerpt)

    let content;
    let blocks = await notion.blocks.children.list({
      block_id: post.id,
    });

    content = [...blocks.results];

    while (blocks.has_more) {
      blocks = await notion.blocks.children.list({
        block_id: post.id,
        start_cursor: blocks.next_cursor,
      });

      content = [...content, ...blocks.results];
    }

    return {
      id: post.id,
      title: post.properties.Name.title[0].plain_text,
      slug: slugify(post.properties.Name.title[0].plain_text.toLowerCase()),
      coverImage: post.properties.CoverImage.files[0].file
        ? post.properties.CoverImage.files[0].file.url
        : post.properties.CoverImage.files[0].name,
      excerpt: post.properties.Excerpt.rich_text[0].plain_text,
      publishDate: post.properties.PublishDate.created_time,
      editDate: post.properties.LastEdited.last_edited_time,
      content,
      // excerpt: "",
    };
  });

  const posts = await Promise.all(postsPromises);
  // const page: any = getArticlePage(data, '5-custom-developer-blogs-i-found-inspiration-from');
  // console.log(page,'page')

  // articles.forEach(article =>console.log(article.properties.Author[0]))
  return {
    props: { preview, posts },
  };
}
