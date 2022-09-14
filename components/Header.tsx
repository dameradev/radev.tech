import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'
import Image from "next/image"
import { MenuIcon, XCircleIcon } from "@heroicons/react/outline"
import { useState } from 'react';

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);


  return (
    <header className=" bg-skin-header  shadow-md fixed w-full z-10 inset-0 h-fit  ">
      <div className='container mx-auto flex items-center justify-between py-6 z-20'>

        <div className='text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight ml-4 md:ml-0'>
          <Link href="/">

            <a className="hover:underline">
              <Image layout='fixed' width="80" height="25" src="/logo.png" alt="logo" />
            </a>
          </Link>


        </div>

        <nav className='hidden md:flex items-center gap-8 text-white'>
          <ul className="flex gap-4 justify-center uppercase">
            <li className="mr-4 text-white">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="mr-4">
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li className="mr-4">
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
          <ThemeSwitch />
        </nav>

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
                    <a>Home</a>
                  </Link>
                </li>
                <li className="">
                  <Link href="/about">
                    <a>About</a>
                  </Link>
                </li>
                <li className="">
                  <Link href="/contact">
                    <a>Contact</a>
                  </Link>
                </li>
              </ul>
              <XCircleIcon className='w-8 self-start cursor-pointer' onClick={() => setIsNavOpen(false)} />
            </nav>
            <div className="flex justify-center w-full mt-6">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>

    </header>
  )
}
