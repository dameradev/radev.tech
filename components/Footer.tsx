import Container from './Container'
import { EXAMPLE_PATH } from '../lib/constants'
import { FaGit, FaGithub, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'

export default function Footer() {
  return (
    <footer className="border-t border-accent-2 bg-base text-text mt-10">
      <Container className="">
        <div className="pt-14 pb-10 flex flex-col lg:flex-row">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2 italic">
            Damian Radev
          </h2>

          {/* Social media links with icons display in an ul list */}
          <div className="flex justify-between w-full">

            <div>
              <p className="text-xl">Connect with me</p>
              <ul className="mt-4 flex  gap-4">
                <li >
                  <a
                    href="https://twitter.com/dameradev"

                  
                  >
                    <FaTwitter className="w-8 h-8" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/dameradev"

                    
                  >

                    <FaGithub className="w-8 h-8" />
                  </a>
                </li>
              </ul>
            </div>
            <nav className='hidden md:flex items-center gap-8'>
              <ul className="flex flex-col gap-4 justify-center uppercase">
                <li className="mr-4 ">
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


        </div>
        <div className="flex justify-between pb-4"><p>© {new Date().getFullYear()} Damian Radev</p> <a href="https://damjans-portfolio.vercel.app/" className="text-secondary">Previous Portfolio Website</a></div>
      </Container>
    </footer>
  )
}
