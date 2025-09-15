import Document, { Html, Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Radev.dev",
                "legalName": "VEB RADEV D.O.O.E.L.",
                "url": "https://radev.dev",
                "email": "info@radev.dev",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Kukush 6/A",
                  "addressLocality": "Shtip",
                  "postalCode": "2000",
                  "addressCountry": "North Macedonia"
                },
                "identifier": [
                  {
                    "@type": "PropertyValue",
                    "propertyID": "DUNS",
                    "value": "499333411"
                  }
                ]
              })
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
