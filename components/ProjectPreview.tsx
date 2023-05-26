import Link from 'next/link';

import { CoverImage } from './CoverImage';
import useWindowSize from '@/lib/hooks/useWindowSize';

import { FaReact, FaNodeJs, FaCss3Alt } from 'react-icons/fa';
// import { DiPrisma } from 'react-icons/di';
import {
  SiGraphql,
  SiNextdotjs,
  SiPrisma,
  SiTailwindcss,
  SiApollographql,
  SiMaterialdesignicons
} from 'react-icons/si';
import { GoDatabase } from 'react-icons/go';
import { MdPayment } from 'react-icons/md';


const techIcons = {
  "NEXT JS": <SiNextdotjs className="w-10 h-10" style={{ color: '#fff' }} />,
  "REACT JS": <FaReact className="w-10 h-10" style={{ color: '#61DAFB' }} />,
  "CSS-IN-JS": <FaCss3Alt className="w-10 h-10" style={{ color: '#264de4' }} />,
  "TAILWIND CSS": <SiTailwindcss className="w-10 h-10" style={{ color: '#06B6D4' }} />,
  "AIRTABLE": <GoDatabase className="w-10 h-10" style={{ color: '#FF5A5F' }} />,
  "DIBSY PAYMENT SYSTEM": <MdPayment className="w-10 h-10" style={{ color: '#9b5de5' }} />,
  "GRAPHQL": <SiGraphql className="w-10 h-10" style={{ color: '#E535AB' }} />,
  "NODE JS": <FaNodeJs className="w-10 h-10" style={{ color: '#68A063' }} />,
  "PRISMA JS": <SiPrisma className="w-10 h-10" style={{ color: '#617191' }} />,
  "APOLLO": <SiApollographql className="w-10 h-10" style={{ color: '#493a88' }} />,
  "MATERIAL UI": <SiMaterialdesignicons className="w-10 h-10" style={{ color: '#0081CB' }} />,
  // add more technology-icon pairs here...
};


export default function ProjectPreview({ post, index }) {
  const { width } = useWindowSize();
  // const featuredMedia = post['_embedded']['wp:featuredmedia'][0];
  const {
    title,
    coverImage,
    date,
    excerpt,
    authors,
    description,
    slug,
    technologies,
    type
  } = post;

  return (
    <article className=''>
      <Link
        className={`bg-zinc-800 rounded-2xl  grid grid-cols-1 lg:grid-cols-2 min-h-[350px] gap-5 ${
          index % 2 === 1 ? 'xl:grid-cols-[30%, 1fr]' : 'xl:grid-cols-[1fr, 30%]'
        }`}
        href={`/projects/${slug}`}
      >
        <div
          className={`md:mb-5 block relative  min-h-[400px] lg:min-h-full lg:h-full ${
            index % 2 === 1 ? 'lg:col-start-1' : 'lg:col-start-2'
          } row-start-1 `}
        >
          {coverImage && (
            <CoverImage slug={slug} title={title.rendered} url={coverImage} />
          )}
        </div>
        
        <div className='p-10'>
          <h2 className='text-3xl md:text-4xl row-start-1'>
            <span className='text-6xl leading-3'>
              {title.charAt(0)}
            </span>
            {title.slice(1)}
          </h2>
          <p className='text-xl mt-4 lg:pr-20 mb-6'>{description}</p>
          {/* <ul className='flex flex-wrap gap-4'>
            {technologies?.map((item) => (
              <span className='keep-all uppercase bg-slate-400 rounded-md px-4 py-1'>
                {item}
              </span>
            ))}
          </ul> */}
          <ul className='flex flex-wrap gap-4 '>
            {technologies?.map((item) => (
              <span className='keep-all uppercase  rounded-md '>
                {techIcons[item.toUpperCase()] || item}{' '}
                {/* If no corresponding icon is found, the item name will be displayed. */}
              </span>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}
