import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'
import Image from "next/image"
import { MenuIcon } from "@heroicons/react/outline"
import { useState } from 'react';

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  

  return (
    <header className=" bg-skin-header  shadow-md fixed w-full z-10 inset-0 h-fit  md:px-28">
      <div className='container mx-auto flex items-center justify-between py-6 z-20'>

        <div className='text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight ml-4 md:ml-0'>
          <Link href="/">

            <a className="hover:underline">
              <Image layout='fixed' width="80" height="25" src="/logo.png" alt="logo" />
            </a>
          </Link>


        </div>

        <nav className='hidden md:flex items-center gap-8 text-white'>
          <ul className="flex justify-center uppercase">
            <li className="mr-4">
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

        <div className="sm:hidden">
          <MenuIcon className="w-8 cursor-pointer text-skin-secondary " onClick={() => setIsNavOpen(!isNavOpen)} />
          <div className={`mt-10 w-full h-[100vh] absolute bg-skin-base z-10 top-10 left-0 transition-all ${isNavOpen ? 'translate-x-0': 'translate-x-[100%]' } `}>
            <nav className='flex  flex-col items-center gap-8 relative top-0 mt-10 '>
              <ul className="flex flex-col items-center gap-6 text-lg justify-center uppercase">
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
              <ThemeSwitch />
            </nav>
          </div>
        </div>

      </div>

    </header>
  )
}
