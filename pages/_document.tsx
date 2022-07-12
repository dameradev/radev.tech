import { ThemeProvider } from '../lib/themeContext'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GlobalStyle } from '../styles/GlobalStyle'

export default class MyDocument extends Document {
  render() {
    return (

      <Html lang="en">
        <Head />
        <body>
          <GlobalStyle />
          <Main />
          <NextScript />
        </body>
      </Html>


    )
  }
}
