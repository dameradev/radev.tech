import '../styles/index.css'

import Prism from 'prismjs'
import React, { useEffect } from 'react'
import { ThemeContext, ThemeProvider } from "../lib/themeContext";
import Page from '../components/Page';

// const ThemeContext = React.createContext('light');

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  // const { toggle } = useContext(ThemeContext);
  // console.log(toggle)

  return (
    <ThemeProvider>

      <Page>
        <Component {...pageProps} />
      </Page>

    </ThemeProvider>
  )

}

export default MyApp
