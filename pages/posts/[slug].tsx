import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/Container";
import PostBody from "../../components/PostBody";
import MoreStories from "../../components/MoreStories";
import Header from "../../components/Header";
import { Client } from "@notionhq/client";
import PostHeader from "../../components/PostHeader";
import Highlight, { defaultProps } from "prism-react-renderer";
import slugify from "slugify";

import GitalkComponent from "gitalk/dist/gitalk-component";
import { useCopyToClipboard } from "../../lib/hooks/useCopyToClipboard";

import PostTitle from "../../components/PostTitle";
import Head from "next/head";
// import theme from "prism-react-renderer/themes/nightOwl";
import vsDark from "prism-react-renderer/themes/vsDark";
import vsLight from "prism-react-renderer/themes/vsLight";

// import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import {
  useEffect,
  useRef,
  useState,
  createRef,
  Fragment,
  useContext,
} from "react";

// import { data } from 'autoprefixer'

import FadeIn from "react-fade-in/lib/FadeIn";

import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/outline";

import readingTime from "reading-time";
import SectionSeparator from "../../components/SectionSeparator";

import styled from "styled-components";
import Layout from "../../components/Layout";
import Comment from "../../components/Comment";
import Sidebar from "../../components/Sidebar";
// import { getPost, getSlugs, getTags, postComment } from '../../lib/wordpress'
import { supabaseClient } from "../../lib/hooks/useSupabase";
import { device } from "../../styles/deviceSIzes";
import Seo from "../../components/Seo";
import { GetStaticPaths } from "next";
import { getAllArticles, getArticlePage, notion } from "../../lib/notion";
import Image from "next/image";
import { PostStyled } from "../../styles/PostPageStyles";
import { FaCopy } from "react-icons/fa";
import { ThemeContext } from "../../lib/themeContext";
import PostContent from "../../components/PostContent";
import { getTimeToRead } from "../../lib/timeToRead";
import UtterancesComments from "../../components/UtterancesComments";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { UserContext } from "../_app";

export default function Post({
  post,
  morePosts,
  preview,
  tags,
  totalViews: staticTotalViews,
  content,
  title,
  publishDate,
  editDate,
  slug,
  coverImage,
  excerpt,
  summary,
}) {
  const router = useRouter();
  // /
  // console.log(publishDate, editDate)

  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // state for total views
  const [totalViews, setTotalViews] = useState(staticTotalViews);

  const [isRequestSent, setIsRequestSent] = useState(false);
  useEffect(() => {
    // if (!isRequestSent) {
    fetch(`/api/views/${slug}`, {
      method: "POST",
    });
    // setIsRequestSent(true);
    // }
  }, [slug]);

  const timeToRead = getTimeToRead(content);

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }

  const { data } = useSWR<{ comments: { text: string; name: string }[] }>(
    `/api/comments/${slug}`,
    fetcher
  );
  const AVATARS = [
    "https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Sunglasses&hairColor=Platinum&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Heather&eyeType=Close&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Black",
    "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Round&hairColor=Blonde&facialHairType=MoustacheFancy&facialHairColor=Blonde&clotheType=BlazerSweater&eyeType=Side&eyebrowType=RaisedExcitedNatural&mouthType=Sad&skinColor=Tanned",
    "https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Round&hairColor=Red&facialHairType=BeardMajestic&facialHairColor=Platinum&clotheType=ShirtVNeck&clotheColor=PastelRed&eyeType=Wink&eyebrowType=SadConcerned&mouthType=Twinkle&skinColor=Pale",
    "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraightStrand&accessoriesType=Prescription01&hairColor=BlondeGolden&facialHairType=Blank&facialHairColor=Auburn&clotheType=Hoodie&clotheColor=PastelOrange&eyeType=Surprised&eyebrowType=UpDown&mouthType=Grimace&skinColor=Brown",
    "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShaggyMullet&accessoriesType=Wayfarers&hairColor=Black&facialHairType=Blank&facialHairColor=BlondeGolden&clotheType=GraphicShirt&clotheColor=Red&graphicType=Bat&eyeType=WinkWacky&eyebrowType=Default&mouthType=Disbelief&skinColor=Pale",
    "https://avataaars.io/?avatarStyle=Circle&topType=LongHairShavedSides&accessoriesType=Sunglasses&hairColor=SilverGray&facialHairType=MoustacheMagnum&facialHairColor=Auburn&clotheType=ShirtCrewNeck&clotheColor=PastelOrange&eyeType=Dizzy&eyebrowType=FlatNatural&mouthType=Tongue&skinColor=Light",
    "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraightStrand&accessoriesType=Kurt&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=Hoodie&clotheColor=PastelGreen&eyeType=Default&eyebrowType=RaisedExcitedNatural&mouthType=Concerned&skinColor=Yellow",
    "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraightStrand&accessoriesType=Kurt&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=Hoodie&clotheColor=PastelGreen&eyeType=Default&eyebrowType=RaisedExcitedNatural&mouthType=Concerned&skinColor=Yellow",
    "https://avataaars.io/?avatarStyle=Circle&topType=WinterHat2&accessoriesType=Round&hatColor=PastelOrange&hairColor=Red&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=White&eyeType=Surprised&eyebrowType=DefaultNatural&mouthType=ScreamOpen&skinColor=Black",
    "https://avataaars.io/?avatarStyle=Circle&topType=WinterHat2&accessoriesType=Round&hatColor=PastelOrange&hairColor=Red&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=White&eyeType=Surprised&eyebrowType=DefaultNatural&mouthType=ScreamOpen&skinColor=Black",
    "https://avataaars.io/?avatarStyle=Circle&topType=LongHairFroBand&accessoriesType=Wayfarers&hatColor=PastelGreen&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=Platinum&clotheType=ShirtCrewNeck&clotheColor=White&eyeType=Cry&eyebrowType=RaisedExcited&mouthType=Concerned&skinColor=Tanned",
    "https://avataaars.io/?avatarStyle=Circle&topType=LongHairBigHair&accessoriesType=Prescription01&hairColor=Red&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Cry&eyebrowType=FlatNatural&mouthType=ScreamOpen&skinColor=Black",
  ];

  // generate a random number between 0 and 11
  // const randomAvatar =
  // console.log(data, 'here')
  const comments = data?.comments;

  async function signInWithGoogle() {
    const { user, error } = await supabaseClient.auth.signIn(
      {
        provider: "google",
      },
      {
        redirectTo: `https://radev.tech${router.asPath}`,
      }
    );
    console.log(user);
    console.log(error);
  }

  const commentsRef = useRef<HTMLDivElement>();

  useEffect(() => { 
    if (router.asPath.split("#access_token=")[1]?.split("&")?.[0]) {
      window.scrollTo(commentsRef?.current.offsetTop, commentsRef?.current.offsetTop - 100)
    }

  });

  
  const [message, setMessage] = useState("");

  const userData = useContext(UserContext);
  
  const [name, setName] = useState(
    userData?.name?.split(" ")[0] || "Please sign in"
  );

  useEffect(() => {
    if (userData?.name) {
      setName(userData?.name?.split(" ")[0]);
    }
  }, [userData]);

  return (
    <Layout preview={preview}>
      <Seo title={title} description={excerpt} />
      <FadeIn>
        <Container className="grid grid-cols-8 relative p-0">
          <div className="col-span-8 md:col-span-12 lg:col-span-5 md:mx-5 px-4 md:px-0 relative">
            <PostHeader
              title={title}
              coverImage={coverImage}
              slug={slug}
              timeToRead={timeToRead}
              date={publishDate}
              editDate={editDate}
            />
            <PostContent content={content} />

            {!userData?.email && (
              <div className="mt-10 flex flex-col items-center italic">
                To comment please authenticate
                <button
                  className="flex items-center gap-2 bg-accent-9 text-accent-0 pl-2 pr-6 my-6"
                  onClick={() => signInWithGoogle()}
                >
                  <Image
                    src={"/google.png"}
                    alt="google"
                    width={50}
                    height={50}
                  />
                  Sign in with Google
                </button>
              </div>
            )}
            <div>
              {/* input and textarea for comments */}
              {message && (
                <p className="text-green-600 text-2xl text-center">{message}</p>
              )}
              <div className="mt-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    fetch(`/api/comments/${slug}`, {
                      method: "POST",
                      body: JSON.stringify({
                        name,
                        comment,
                      }),
                    });
                    setName("");
                    setComment("");
                    setMessage("Thanks for your comment!");
                  }}
                >
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-lg">
                      Name
                    </label>
                    <input
                      disabled
                      type="text"
                      name="name"
                      id="name"
                      className="text-black border border-gray-300 rounded-lg p-2 mt-2"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div ref={commentsRef} className="flex flex-col mt-4">
                    <label htmlFor="comment" className="text-lg">
                      Comment
                    </label>
                    <textarea
                      disabled={!userData?.name}
                      name="comment"
                      id="comment"
                      className="text-black border border-gray-300 rounded-lg p-2 mt-2"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <button
                    disabled={!userData?.name}
                    type="submit"
                    className="bg-slate-700 text-white rounded-lg p-2 mt-4"
                  >
                    Submit
                  </button>
                </form>
              </div>
              {/* list of comments */}
              {comments?.length && <p className="text-2xl text-center mt-10">Comments</p>}
              <ul className="list-none">
                {comments?.map((comment, index) => (
                  <li
                    key={index}
                    className="bg-slate-700 p-6 rounded-lg shadow-lg my-4 flex items-start"
                  >
                    <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden">
                      <img src={AVATARS[Math.floor(Math.random() * 12)]} />
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-extrabold">{comment.name}</p>
                      <p className="text-gray-700 mt-2">{comment.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </FadeIn>
    </Layout>
  );
}
//hey Next, these are the possible slugs

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID);

  data.forEach((result) => {
    if (result.object === "page") {
      // console.log(result.properties, "here");
      paths.push({
        params: {
          slug: slugify(
            result.properties.Name.title[0].plain_text
          ).toLowerCase(),
        },
      });
    }
  });

  // console.log(paths)
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  let content = [];
  let articleTitle = "";
  let publishedDate = null;
  let lastEditedAt = null;
  let coverImage = null;
  let sponsoredArticleUrl = null;
  let summary = null;

  // const profilePicture = await getTwitterProfilePicture();

  // const notion = new Client({
  //   auth: process.env.NOTION_SECRET
  // });

  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID);
  const page: any = getArticlePage(data, slug);

  //  console.log(page.properties)

  const response = await supabaseClient
    .from("posts")
    .select("view_count")
    .filter("slug", "eq", slug);
  // console.log(response)
  const totalViews = response.data[0]?.view_count || 0;

  articleTitle = page.properties.Name.title[0].plain_text;

  let blocks = await notion.blocks.children.list({
    block_id: page.id,
  });

  content = [...blocks.results];

  while (blocks.has_more) {
    blocks = await notion.blocks.children.list({
      block_id: page.id,
      start_cursor: blocks.next_cursor,
    });

    content = [...content, ...blocks.results];
  }

  // console.log(page.properties.test.files.name)
  return {
    props: {
      content,
      title: articleTitle,
      excerpt: page.properties.Excerpt.rich_text[0].plain_text,
      publishDate: page.properties.PublishDate.created_time,
      editDate: page.properties.LastEdited.last_edited_time,
      slug,
      coverImage,
      summary,
      totalViews,
      // moreArticles,
      // profilePicture,
      // sponsoredArticleUrl
    },
    revalidate: 30,
  };
};

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value, index) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        key={index}
        className={`${[
          code &&
            "bg-code text-secondary px-2 py-[2px] rounded-md text-md md:text-lg ",
        ].join()}
          ${[bold && "font-bold"].join()} 
          ${[italic && "italic"].join()}
        `}
        style={color !== "default" ? { color } : {}}
      >
        {text.link ? (
          <a className="text-secondary" href={text.link.url}>
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    );
  });
};
