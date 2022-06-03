import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GlobalStyle } from 'styles/GlobalStyle'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className='bg-skin-base text-skin-fg'>
          <GlobalStyle />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
