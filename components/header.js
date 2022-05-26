import Link from 'next/link'

export default function Header() {
  return (
    <header className=" bg-primary text-white fixed w-full z-10 inset-0 h-fit">
      <div className='container mx-auto flex items-center justify-between py-6'>

      <div className='text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight ml-4 md:ml-0'>
        <Link href="/">
          <a className="hover:underline">T&T</a>
        </Link>
      </div>

      <nav>
        <ul className="flex justify-center">
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
      </nav>
        
      </div>
      
    </header>
  )
}
