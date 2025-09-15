import Footer from './Footer'
import Header from './Header'
import Seo from './Seo'

type SeoProps = {
  title?: string
  description?: string
  canonical?: string
}

const Layout = ({ preview, children, seo }: { preview?: string; children: any; seo?: SeoProps }) => {
  return (
    <>
      <Seo {...(seo || {})} />
      <Header />
      <a href="#main-content" className='sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-black p-2 rounded'>Skip to content</a>
      <div className='h-24' />
      <main id='main-content'>{children}</main>
      <Footer />
    </>
  )
}

export default Layout;