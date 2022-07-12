import Alert from './Alert'
import Footer from './Footer'
import Meta from './Meta'
import Header from './Header'
import Intro from './Intro'
import ThemeSwitch from './ThemeSwitch'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <Header />
      {/* <ThemeSwitch /> */}
      <div className='h-24' />
      

      <main>{children}</main>
       
      
      {/* <Footer /> */}
    </>
  )
}
