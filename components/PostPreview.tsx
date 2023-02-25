import Avatar from "./Avatar";
import Date from "./Date";
import CoverImage from "./CoverImage";
import Link from "next/link";
import styled from "styled-components";
import TimeToRead from "./TimeToRead";
import { device } from "../styles/deviceSIzes";
// import { getFeaturedImage } from '@/lib/wordpress'

const PostStyled = styled.div`
  &:hover {
    img {
      opacity: 0.8;
    }
  }

  max-height: min-content;
  .excerpt {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

`;

export default function PostPreview({
  title,
  coverImage,
  excerpt,
  timeToRead,
  slug,
  post,
}) {
  return (
    <PostStyled className="bg-accent-1 rounded-2xl flex flex-col items-start justify-between">
      <Link
        className="md:mb-5 block relative w-full h-[25rem] md:h-[30rem] lg:h-[30rem]"
        href={`/posts/${slug}`}
      >
        {coverImage && (
          <CoverImage slug={slug} title={title.rendered} url={coverImage} />
        )}
      </Link>
      <div className="px-4  my-4 text-xs uppercase flex gap-x-4 items-center">
        <Date dateString={post.publishDate} />
        <TimeToRead timeToRead={timeToRead} />
      </div>
      <div className="px-4  flex flex-col">
        <h3 className="mb-6 text-3xl leading-snug">
          <Link className="hover:underline" href={`/posts/${slug}`}>
            {title}
          </Link>
        </h3>

        {/* <div className="excerpt mb-4 text-lg leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: excerpt
          }}>

        </div> */}
      </div>
    </PostStyled>
  );
}
