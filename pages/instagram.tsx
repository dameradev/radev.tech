import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Container from '../components/Container';
import Layout from '../components/Layout';
import { notion } from '../lib/notion';

const Instagram = ({ preview, images }) => {
  return (
    <Layout preview={preview}>
      <Container>
        <h1 className='text-5xl my-10'>Instagram</h1>

        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
          {images?.sort((a, b) => b - a ? 1 : - 1)?.map((image) => (
            <li key={image.id}>

              <Link href={image.url || ""} target={image.url.includes('radev') ? "_self" : "_blank"}>
                <Image
                  width={520}
                  height={520}
                  src={image.media_url}
                  alt={image.caption}
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  );
};


export async function getServerSideProps(context) {


  const res = await axios.get(`https://graph.instagram.com/me/media?fields=id,caption,media_url,image&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`)

  console.log(res.data.data)

  const response = await notion.databases.query({
    database_id: process.env.INSTAGRAM_DATABASE_ID,
    filter: {
      or: [
        {
          property: 'published',
          checkbox: {
            equals: true,
          }
        },
      ]
    },
  });

  const images = response.results.map((item: any) => {
    const foundInstagramImage = res.data.data.find((image) => {
      return image.id === item.properties.post.rich_text[0].plain_text
    })

    console.log(foundInstagramImage)
    console.log(item)

    return {
      ...foundInstagramImage,
      url: item.properties.url.url,
      sort: item.properties.sort.number,

    }
  })

  return {
    props: { images }, // will be passed to the page component as props
  }
}


export default Instagram;