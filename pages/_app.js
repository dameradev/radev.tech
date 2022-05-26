import '../styles/index.css'

import Prism from 'prismjs'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
