// "use client"
import React from 'react';
import { notion, slugifyResult } from '../../../lib/notion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Highliter from '../../../components/Highliter';
import CodeBlock from '../../../components/CodeBlock';
import Container from '../../../components/Container';
// import { renderBlocks } from '../../../components/CodeBlock';



async function getData(slug) {

  console.log(slug)
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


  // @ts-expect-error
  let page = response.results.find((page) => slugifyResult(page.properties.name.title[0].plain_text) === slug);


  // notion.pages.properties.retrieve({
  //   page_id: page.id,

  //   property_id: page.
  // })


  if (page) {

    let blocks = await notion.blocks.children.list({
      block_id: page.id
    });
    let content;

    content = [...blocks.results];

    while (blocks.has_more) {
      blocks = await notion.blocks.children.list({
        block_id: page.id,
        start_cursor: blocks.next_cursor
      });

      content = [...content, ...blocks.results];
    }

    return { content, page }
  }
}
const Page = async (props) => {


  const { page, content }: { page: any, content: any } = await getData(props.params.slug) 
  await getData(props.params.slug)

  return (
    <Container className="">
      
      <h1 className='text-5xl pt-10'>{page.properties.name.title[0].plain_text}</h1>
      <p className='text-2xl pt-10'>{page.properties.description?.rich_text[0]?.plain_text}</p>
      
      {content.map((block) => (
        <div className={`post-content `}>
          {renderBlocks(block)}
        </div>
      ))}

    </Container>
  );
};
function renderBlocks(block) {
  const { type, id } = block;
  const value = block[type];

  // if (type === "bulleted_list_item") {
  //   console.log(value)
  // }

  switch (type) {

    case 'code':

      return (
        <CodeBlock
          fileName={value.caption?.[0]?.plain_text}
          language={value.language}
          code={value.text[0].text.content}
        />
      );
  }
}





export default Page;