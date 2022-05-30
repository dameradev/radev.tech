import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'
import Header from './header'
import Intro from './intro'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <Header />
      <div className='h-32' />
      <div className="min-h-screen  grid grid-cols-5 relative">

        <main className='col-span-4'>{children}</main>
        <div className='pr-4 relative '>
          <div className='sticky top-22'>
            <div className='text-gray-600'>


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

            <div className=' right-0 border-t-2 border-b-2 py-10 px-6 text-gray-600 border-gray-300'>

              <p className='font-bold'>Subscribe for news</p>
              <form className='pt-4 flex flex-col '>
                <input className='p-2 border-2 text-gray-800 rounded-xl' type="email" placeholder="Email" />
                <button className='text-primary font-medium border-2 border-primary mt-4 py-2 rounded-xl uppercase' type="submit">Subscribe</button>
              </form>

            </div>
          </div>


        </div>
      </div>
      <Footer />
    </>
  )
}
