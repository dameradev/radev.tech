import Container from './Container'
import { EXAMPLE_PATH } from '../lib/constants'
import { FaGit, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'

export default function Footer() {
  return (
    <footer className="border-t border-accent-2 bg-base text-text mt-10">
      <Container className="">

        <div className=" w-full grid grid-cols-1 md:grid-cols-3 items-center justify-items-center py-6 z-20">

          <nav className='mb-6 md:mb-0 justify-self-center md:flex items-center gap-8 md:justify-self-start'>
            <ul className="grid grid-cols-2 md:flex lg:grid flex-col gap-4 justify-center uppercase text-center md:text-left">
              <li className="md:mr-4 ">
                <Link href="/">
                  Home
                </Link>
              </li>
              <li className="md:mr-4">
                <Link href="/about">
                  About
                </Link>
              </li>
              <li className="md:mr-4">
                <Link href="/contact">
                  Contact
                </Link>
              </li>
              <li className="md:mr-4">
                <Link href="/snippets">
                  Snippets
                </Link>
              </li>
              <li className="md:mr-4">
                <Link href="/projects">
                  Projects
                </Link>
              </li>
              <li className="">
                <Link href="/instagram">
                  Instagram Links
                </Link>
              </li>
            </ul>

            {/* <ThemeSwitch className="self-start"/> */}
          </nav>

          <h2 className="text-5xl font-bold min-w-full justify-self-center text-center">
            Damian Radev
          </h2>

          {/* Social media links with icons display in an ul list */}
          <div className='mt-6 md:mt-0 md:justify-self-end'>
            <p className="text-xl">Connect with me</p>
            <ul className="mt-4 flex flex-col justify-end items-center md:items-end gap-4">
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
              <li>
                <a
                  href="https://instagram.com/webradev"


                >

                  <FaInstagram className="w-8 h-8" />
                </a>
              </li>
            </ul>


          </div>


        </div>
        <div className="flex justify-between pb-4"><p>© {new Date().getFullYear()} Damian Radev</p> <a href="https://damjans-portfolio.vercel.app/" className="text-secondary">Previous Portfolio Website</a></div>
      </Container>
    </footer>
  )
}
