import Footer from './Footer'
import Header from './Header'
import Seo from './Seo'

const Layout = ({ preview, children }) => {
  return (
    <>
      <Seo />
      <Header />
      <div className='h-24' />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout;