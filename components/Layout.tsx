import Alert from './Alert'
import Footer from './Footer'
import Meta from './Meta'
import Header from './Header'
import Intro from './Intro'
import ThemeSwitch from './ThemeSwitch'
import Seo from './Seo'

export default function Layout({ preview, children }) {
  return (
    <>
      <Seo />
      <Header />
      {/* <ThemeSwitch /> */}
      <div className='h-24' />
      

      <main>{children}</main>
       
      
      <Footer />
    </>
  )
}
