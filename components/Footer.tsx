import Container from "./Container";

import { FaGit, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-accent-2 bg-base text-text mt-10">
      <Container className="">
        <div className=" w-full grid grid-cols-1 md:grid-cols-3 items-center justify-items-center py-6 z-20">
          <nav className="mb-6 md:mb-0 justify-self-center md:flex items-center gap-8 md:justify-self-start">
            <ul className="grid grid-cols-2 md:flex lg:grid flex-col gap-4 justify-center uppercase text-center md:text-left">
              <li className="md:mr-4 ">
                <Link href="/">Home</Link>
              </li>
              <li className="md:mr-4">
                <Link href="/about">About</Link>
              </li>
              <li className="md:mr-4">
                <Link href="/contact">Contact / Imprint</Link>
              </li>
              <li className="md:mr-4">
                <Link href="/snippets">Snippets</Link>
              </li>
              <li className="md:mr-4">
                <Link href="/projects">Projects</Link>
              </li>
              <li className="">
                <Link href="/instagram">Instagram Links</Link>
              </li>
              <li className="md:mr-4">
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li className="md:mr-4">
                <Link href="/terms">Terms of Service</Link>
              </li>
            </ul>

            {/* <ThemeSwitch className="self-start"/> */}
          </nav>

          <h2 className="text-5xl font-bold min-w-full justify-self-center text-center">
            Damjan Radev
          </h2>

          {/* Social media links with icons display in an ul list */}
          <div className="mt-6 md:mt-0 md:justify-self-end">
            <p className="text-xl">Connect with me</p>
            <ul className="mt-4 flex flex-col justify-end items-center md:items-end gap-4">
              <li>
                <a href="https://twitter.com/dameradev">
                  <FaTwitter className="w-8 h-8" />
                </a>
              </li>
              <li>
                <a href="https://github.com/dameradev">
                  <FaGithub className="w-8 h-8" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com/webradev">
                  <FaInstagram className="w-8 h-8" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-between pb-4 text-sm md:text-base">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Radev.dev. A brand of <strong>VEB RADEV D.O.O.E.L.</strong>, Kukush 6/A, 2000, Shtip, North Macedonia. D-U-N-S: 499333411.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="underline">Privacy Policy</Link>
            <Link href="/terms" className="underline">Terms of Service</Link>
            <Link href="/contact" className="underline">Contact / Imprint</Link>
          </div>
        </div>
        <a
          title="Google Analytics Alternative"
          href="https://clicky.com/101394034"
        >
          <img
            alt="Clicky"
            src="//static.getclicky.com/media/links/badge.gif"
            // border="0"
          />
        </a>
        <script async src="//static.getclicky.com/101394034.js"></script>
        <noscript>
          <p>
            <img
              alt="Clicky"
              width="1"
              height="1"
              src="//in.getclicky.com/101394034ns.gif"
            />
          </p>
        </noscript>
      </Container>
    </footer>
  );
}
