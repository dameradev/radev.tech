// @refresh reset
import Image from 'next/image';
import Link from 'next/link';
import Highlight, { defaultProps } from 'prism-react-renderer';
import vsDark from "prism-react-renderer/themes/vsDark";
import React, { Fragment, useContext } from 'react';
import slugify from 'slugify';
import Container from '../../components/Container';
// import { useCopyToClipboard } from '../../lib/hooks/useCopyToClipboard';


import { notion } from '../../lib/notion';
import { ThemeContext } from '../../lib/themeContext';

async function getData() {


  const response = await notion.databases.query({
    database_id: "a730902fdfee4eee96723b64d57262c9",

    filter: {
      or: [
        {
          property: "Resource",
          relation: {
            contains: "1b38f3d8c7214dc4be45d138107ff5b4"
          }
        }
      ]



    }
  });

  console.log(response.results)

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return response.results
}


const Page = async () => {

  const data = await getData()
  // @ts-expect-error
  console.log(data[0]?.properties.name.title[0].plain_text)

  // let content = [];
  // const page = data[0];
  // let blocks = await notion?.blocks?.children.list({
  //   block_id: page.id
  // });

  // content = [...blocks.results];

  // while (blocks.has_more) {
  //   blocks = await notion.blocks.children.list({
  //     block_id: page.id,
  //     start_cursor: blocks.next_cursor
  //   });

  //   content = [...content, ...blocks.results];
  // }



  return (
    <Container className="" >
      <h1 className='text-5xl py-10'>Snippets</h1>

      <ul className='flex flex-col gap-6'>

        {data.map((item) => {
          {/* @ts-expect-error */ }
          const name = item.properties.name.title[0].plain_text
          {/* @ts-expect-error */ }
          const description = item.properties.description?.rich_text[0]?.plain_text
          {/* @ts-expect-error */ }
          const tags = item.properties.tags.multi_select;
          return (
            <Link className='flex  items-center justify-between w-full bg-slate-800 p-4 rounded-lg' href={`snippets/${slugify(name).toLowerCase()}`} key={item.id}>
              <div className='flex flex-col'>
              <p className='text-2xl'>
                {name}
              </p>
              <p>{description}</p>
              </div>
              <ul className='flex flex-col md:flex-row  gap-2 '>{tags.map(tag => <li className={`bg-${tag.color}-800 px-2 py-1 rounded-2xl text-xs min-w-max self-end  w-fit`   }>#{tag.name}</li>)}</ul>
            </Link>
          )
        })}

      </ul>
    </Container>
  );
};





export default Page;