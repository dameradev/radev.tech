import React, { useState } from 'react';
import { MenuIcon, XCircleIcon } from "@heroicons/react/outline"
import Link from 'next/link'

const MobileNavigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div className="cursor-pointer text-skin-secondary bg-slate-700 p-2 rounded-full hover:opacity-90 border-2 border-transparent ease-in hover:border-secondary">
        <MenuIcon className="w-6" onClick={() => setIsNavOpen(!isNavOpen)} />
      </div>
      {/* {isNavOpen && <div className='w-[100vw] h-[100vh] absolute bg-white top-0 left-0 opacity-30' />} */}
      {isNavOpen &&
        <div className='fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-gray-900/80 ' onClick={() => setIsNavOpen(!isNavOpen)} />
      }
      <div className={`mt-10 w-fit h-fit  absolute bg-skin-base z-10 top-[-12px] right-5 transition-all p-5 px-5 rounded-md ${isNavOpen ? 'translate-x-0' : 'translate-x-[120%]'} `}>

        <nav className='flex  items-center gap-8 relative top-0  '>

          <ul className="flex flex-col  gap-6 text-lg justify-center uppercase mr-15">
            <li className="">
              <Link href="/">
                Home
              </Link>
            </li>
            <li className="">
              <Link href="/about">
                About
              </Link>
            </li>
            <li className="">
              <Link href="/contact">
                Contact
              </Link>
            </li>
            <li className="">
              <Link href="/projects">
                Projects
              </Link>
            </li>
          </ul >
          <XCircleIcon className='w-8 self-start cursor-pointer' onClick={() => setIsNavOpen(false)} />
        </nav >
        <div className="flex justify-center w-full mt-6">
          <ThemeSwitch />
        </div>
      </div >
    </div >
  );
};

export default MobileNavigation;

