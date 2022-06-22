import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'
import Header from './header'
import Intro from './intro'
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
