import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'
import Image from "next/image"

export default function Header() {
  return (
    <header className=" bg-skin-header text-white shadow-md fixed w-full z-10 inset-0 h-fit  px-28">
      <div className='container mx-auto flex items-center justify-between py-6'>

        <div className='text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight ml-4 md:ml-0'>
          <Link href="/">
            
            <a className="hover:underline">
              <Image layout='fixed' width="80" height="25" src="/logo.png" alt="logo" />
            </a>
          </Link>


        </div>

        <nav className='flex items-center gap-8'>
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

      </div>

    </header>
  )
}
