import Head from 'next/head';

const DOMAIN = 'https://radev.tech';
const DEFAULT_OG_IMAGE = '';

const Seo = ({
  title = "Radev's Digital Space ",
  description = 'Damjan Radev is a freelance web-developer working on mostly on the front-end, writing about the web on his learning journey.',
  siteName = 'Damjan Radev',
  canonical = DOMAIN,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  twitterHandle = '@dameradev',
  ogUrl = '',
}) => {
  return (
    <Head>
      <title key='title'>{`${title} – ${siteName}`}</title>
      <meta name='description' content={description} />
      <meta key='og_type' property='og:type' content={ogType} />
      <meta key='og_title' property='og:title' content={title} />
      <meta
        key='og_description'
        property='og:description'
        content={description}
      />
      <meta key='og_locale' property='og:locale' content='en_IE' />
      <meta key='og_site_name' property='og:site_name' content={siteName} />
      <meta
        key='og_url'
        property='og:url'
        content={ogUrl || (canonical ?? DOMAIN)}
      />
      <meta key='og_site_name' property='og:site_name' content={siteName} />
      <meta
        name='google-site-verification'
        content='WlAkywNQehSxEY1-hPHl8-dbrKlvu3pqQXKZjGzkdBI'
      />

      <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
      <link rel='alternate icon' href='/favicon.ico' />

      <meta
        property='og:image:alt'
        content={`${title} | ${siteName}`}
      />

      <meta
        property='og:image'
        content={ogImage ? ogImage : DEFAULT_OG_IMAGE}
      />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />

      <meta name='robots' content='index,follow' />

      <meta name='twitter:card' content='summary_large_image' />

      <meta
        name='twitter:image'
        content={ogImage ? ogImage : DEFAULT_OG_IMAGE}
      />
      <meta name='twitter:site' content={twitterHandle} />
      <meta name='twitter:creator' content={twitterHandle} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />

      <link rel='canonical' href={ogUrl || (canonical ?? DOMAIN)} />
    </Head>
  );
};

export default Seo;
