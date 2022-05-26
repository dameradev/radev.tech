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
      <div className="min-h-screen mt-32">
        
        <main className=''>{children}</main>
      </div>
      <Footer />
    </>
  )
}
