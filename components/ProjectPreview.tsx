import Avatar from './Avatar'
import Date from './Date'
import CoverImage from './CoverImage'
import Link from 'next/link'
import styled from 'styled-components'
import useWindowSize from '../lib/hooks/useWindowSize'
// import { getFeaturedImage } from '../lib/wordpress'


const ProjectStyled = styled.div`
  position: relative;
 

  .name-and-type {
    position: absolute;
    top: 6rem;
    left: 6rem;
    display: none;
  }

  h3 {
    display: none;
    @media  only screen and (max-width: 760px) {
      display: block;
    }
  }
  max-height: min-content;
  .excerpt {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }
`

const PostInfoStyled = styled.p`
  position: relative;
  &:before {
    content: "";
    width: 5px;
    height: 5px;
    background: var(--color-secondary);
    border-radius: 100%;
    position: absolute;
    top: 5px;
    left: -10px;
  }
`


export default function ProjectPreview({
  post
}) {

  const { width } = useWindowSize()
  // const featuredMedia = post['_embedded']['wp:featuredmedia'][0];
  const { title,
    coverImage,
    date,
    excerpt,
    authors,
    description,
    slug,
    technologies,
    type } = post
  console.log(technologies)
  return (
    <ProjectStyled className="">
      <Link className='grid lg:grid-cols-8 gap-10 md:grid-cols-1' href={`/projects/${slug}`}>
        
          <div className='md:col-span-4 lg:col-span-3'>{coverImage && <CoverImage slug={slug} title={title.rendered} url={coverImage} />}</div>
          <div className='md:col-span-4 lg:col-span-5'>
            <h2 className='text-4xl'>{title}</h2>
            <p className='text-xl mt-4 lg:pr-20 mb-6'>{description}</p>
            <ul className='flex flex-wrap gap-4'>
            {technologies?.map(item => <span className='keep-all uppercase bg-slate-400 rounded-md px-4 py-1'>{item}</span>)}
            </ul>
          </div>
          {/* {width < 760 &&
            <h2 className="mt-5 mb-6 text-3xl leading-snug">
              <a className="hover:underline">{title}</a>
            </h2>
          }

          <div className='name-and-type text-white'>
            {/* <h2 className='text-4xl mb-6'>{title}</h2> */}
          {/* <span className='uppercase'>- {type}</span> */}
          {/* </div> */}

          {/* <div className="excerpt mb-4 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: excerpt
            }}>

          </div> */}
        
      </Link>
    </ProjectStyled>
  )
}
