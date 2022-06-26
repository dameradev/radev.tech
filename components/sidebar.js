import Link from 'next/link';
import React from 'react';

import { FaTwitter, FaGithub } from 'react-icons/fa';

const Sidebar = ({ tags, className }) => {

  return (
    <div className={` ${className} md:pl-4 relative md:col-span-2 w-full text-center md:text-left`}>
      <div className='sticky top-30 md:pt-14'>
        <div className=''>


          <p className='font-bold text-xl'>Browse tags</p>

          <ul className='flex flex-wrap gap-2 py-6 text-md justify-center md:justify-start'>
            {
              tags.map(tag => (
                <li className='border-2 px-2 py-1 rounded-full border-gray-400 uppercase text-sm'>
                  <Link href={tag.slug}>
                    {tag.name}
                  </Link>
                  
                </li>
              ))
            }

          </ul>
        </div>

        <div className='right-0 py-10  border-gray-300'>

          <p className='font-bold text-xl'>Subscribe for news</p>
          <form className='pt-4 flex flex-col '>
            <input className='pl-6 p-3 border-[1px] bg-transparent rounded-full text-sm' type="email" placeholder="EMAIL ADDRESS" />
            <button className='text-white bg-secondary text-xs font-medium border-2 border-skin-secondary mt-4 py-3 rounded-full uppercase' type="submit">Subscribe</button>
          </form>

        </div>
        <div>
          <p className='font-bold text-xl'>Let's connect</p>
          <ul className='flex justify-center md:justify-start gap-3 mt-4'>
            <li className='cursor-pointer'>
              <a href='' className='w-10 h-10  bg-skin-gray flex items-center justify-center rounded-full'>
                <FaTwitter className='w-5 h-5' />
              </a>
            </li>
            <li className='cursor-pointer'>
              <a href='' className='w-10 h-10  bg-skin-gray flex items-center justify-center rounded-full'>
                <FaGithub className='w-5 h-5' />
              </a>
            </li>
          </ul>
        </div>
      </div>


    </div>
  );
};

export default Sidebar;