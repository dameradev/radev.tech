import React from 'react';

const Sidebar = () => {
  return (
    <div className='pl-4 relative col-span-2 w-full mt-16 '>
      <div className='sticky top-34'>
        <div className=''>


          <p className='font-bold '>Browse tags</p>

          <ul className='flex flex-wrap gap-2 py-6 text-xs'>
            <li className='border-2 px-2 py-1 rounded-3xl border-gray-400'>
              HEADLESS
            </li>
            <li className='border-2 px-2 py-1 rounded-3xl border-gray-400'>
              HEADLESS
            </li>
            <li className='border-2 px-2 py-1 rounded-3xl border-gray-400'>
              HEADLESS
            </li>
          </ul>
        </div>

        <div className='right-0 py-10  border-gray-300'>

          <p className='font-bold'>Subscribe for news</p>
          <form className='pt-4 flex flex-col '>
            <input className='pl-6 p-3 border-[1px] bg-transparent rounded-full text-sm' type="email" placeholder="EMAIL ADDRESS" />
            <button className='text-white bg-secondary text-xs font-medium border-2 border-skin-secondary mt-4 py-3 rounded-full uppercase' type="submit">Subscribe</button>
          </form>

        </div>
      </div>


    </div>
  );
};

export default Sidebar;