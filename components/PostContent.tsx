import Image from 'next/image';
import Highlight, { defaultProps } from 'prism-react-renderer';
import React, { Fragment, useContext } from 'react';
import { useCopyToClipboard } from '../lib/hooks/useCopyToClipboard';
import { ThemeContext } from '../lib/themeContext';
import { Text } from '../pages/posts/[slug]';

import vsDark from "prism-react-renderer/themes/vsDark";
import vsLight from "prism-react-renderer/themes/vsLight";
import { FaCopy } from 'react-icons/fa';

const PostContent = ({ content }) => {
  return (
    <>
      {content.map((block) => (
        <>
          {renderBlocks(block)}
          {/* dame   */}
          {/* {console.log(block)} */}
        </>
      ))}
    </>
  );
};

export default PostContent;

export function renderBlocks(block) {
  const { type, id } = block;
  const value = block[type];

  // if (type === "bulleted_list_item") {
  //   console.log(value)
  // }

  switch (type) {
    case 'paragraph':
      return (
        <p className='my-4 md:leading-[3.6rem] text-lg md:text-xl  ' >

          <Text text={value.text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1 className='text-6xl'>
          {value.text[0].text.content}
        </h1>
      );
    case 'heading_2':
      console.log(value)
      return (
        <h2 className='text-3xl lg:text-4xl mt-12 font-bold'>
          {value.text[0].href ?
            <a target="_blank" href={value.text[0].href} className='text-accent-2'>
              {value.text[0].text.content}
            </a>
            :
            value.text[0].text.content}
        </h2>
      );
    case 'heading_3':
      return (
        <h3 className="text-xl mt-6 font-bold">
          {value.text[0].text.content}
        </h3>
      );

    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li className='mt-2 text-lg md:text-xl leading-normal list-inside marker:hidden'>
          <Text text={value.text} />
          {value.children?.map((block) => (
            <div key={block.id}>{renderBlocks(block)}</div>
          ))}
        </li>
      );
    case 'to_do':
      return (
        <div>
          <label
            htmlFor={id}
            className="flex items-center justify-start space-x-3"
          >
            <input
              id={id}
              aria-describedby={value.text}
              name={id}
              type="checkbox"
              className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
            />
            {value.text}
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            {value.text}
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return <p>{value.title}</p>;
    case 'image':
      const src =
        value.type === 'external' ? value.external.url : value.file.url;
      const caption =
        value.caption.length >= 1 ? value.caption[0].plain_text : '';
      return (
        <figure className=" mt-0 px-2 py-5">
          <Image
            className="rounded-xl"
            objectFit="fill"
            width={1200}
            height={800}
            alt={
              caption
                ? caption
                : 'A visual depiction of what is being written about'
            }
            src={src}
          />
          {caption && (
            <figcaption className="text-center">{caption}</figcaption>
          )}
        </figure>
        // <figure className="my-4">
        //   <div className=' '>
        //     <Image
        //       className="rounded-xl"
        //       layout="responsive"
        //       width="50%"
        //       height={"50%"}
        //       alt={
        //         caption
        //           ? caption
        //           : 'A visual depiction of what is being written about'
        //       }
        //       src={src}
        //     />
        //     {caption && (
        //       <figcaption className="text-center">{caption}</figcaption>
        //     )}
        //   </div>
        // </figure>
      );
    case 'code':
      return (
        <CodeBlock
          fileName={value.caption?.[0]?.plain_text}
          language={value.language}
          code={value.text[0].text.content}
        />
      );
    case 'callout':
      return (

        <div className="flex p-3 space-x-4 bg-gray-100 rounded-lg bg-info-window mt-6" >
          {value.icon && <span>{value.icon.emoji}</span>}
          <div>
            <Text text={value.text} />
          </div>
        </div>
      );
    case 'embed':
      const codePenEmbedKey = value.url.slice(value.url.lastIndexOf('/') + 1);
      return (
        <div>
          <iframe
            height="600"
            className="w-full"
            scrolling="no"
            title="Postage from Bag End"
            src={`https://codepen.io/braydoncoyer/embed/preview/${codePenEmbedKey}?default-tab=result`}
            frameBorder="no"
            loading="lazy"
            allowFullScreen={true}
          >
            See the Pen <a href={value.url}>Postage from Bag End</a> by Braydon
            Coyer (<a href="https://codepen.io/braydoncoyer">@braydoncoyer</a>)
            on <a href="https://codepen.io">CodePen</a>.
          </iframe>
        </div>
      );
    case 'table_of_contents':
      return (
        <>
          <div>
            TOC
          </div>
        </>
      );
    case 'video':
      return "test"//<YoutubeEmbed url={value.external.url} />;
    case 'quote':
      return (
        <blockquote className="p-4 rounded-r-lg">
          {/* <Text text={value.text} /> */}
        </blockquote>
      );
    case 'divider':
      return (
        <hr className="my-16 w-full border-none text-center h-10 before:content-['∿∿∿'] before:text-[#D1D5DB] before:text-2xl"></hr>
      );
    default:
      return `❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type
        })`;
  }
}

const RE = /{([\d,-]+)}/;
const calculateLinesToHighlight = (meta) => {
  if (!RE.test(meta)) {
    return () => false;
  }
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)));
  return (index) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    );
    return inRange;
  };
};


export const CodeBlock = ({ code, language, metastring = "", fileName }) => {
  const [isCopied, handleCopy] = useCopyToClipboard(1000, code);
  const shouldHighlightLine = calculateLinesToHighlight(metastring);


  const { toggle } = useContext(ThemeContext)
  let languageFormatted, color;
  switch (language) {
    case "javascript":
      languageFormatted = "JS"
      color = "text-yellow-500"

      break;
    case "typescript":
      languageFormatted = "TS"
      color = "text-blue-400"
      break;
    case "css":
      languageFormatted = "CSS"
      color = "text-blue-400"
      break;
    case "markup":
      languageFormatted = "HTML"
      color = "text-orange-600"
      break;
    default:
      languageFormatted = language
      color = "text-secondary"
      break;
  }

  return (
    <div>
      <Highlight
        {...defaultProps}
        code={code}
        language={language}
        theme={toggle ? vsDark : vsLight}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div className={`relative not-prose my-10 ${!toggle ? "border-red-100 border-[1px]" : ""}`} >
            <pre
              className={`rounded-xl relative overflow-hidden bg-slate-800 ${className}`}
              style={style}
            >
              <div className="relative flex text-xs leading-6 ">
                <div className="flex items-center  px-4 pt-1 mt-2  border-t border-b border-t-transparent border-b-slate-400 w-full justify-between">
                  <p className={`${toggle ? "bg-zinc-800" : "bg-zinc-200"} h-full pt-2 pb-2 px-4`}><span className={color}>{JSON.stringify(languageFormatted).replace(/['"]+/g, '').toUpperCase()}</span> <span className='text-current'>{fileName}</span></p>
                  <button
                    className={`hidden md:inline-block group mb-2 mr-1 ${isCopied ? 'text-secondary' : 'text-gray-400'}`}
                    onClick={() => handleCopy()}
                  >
                    <span className="sr-only">Copy code</span>
                    <FaCopy />
                  </button>
                </div>
              </div>
              <div className="relative w-auto p-5 overflow-auto prose text-gray-300 prose-full-width text-sm md:text-md">
                <span>
                  {tokens.map((line, i) => {
                    const lineProps = getLineProps({ line, key: i });

                    if (shouldHighlightLine(i)) {
                      lineProps.className = `${lineProps.className} highlight-line`;
                    }

                    return (
                      <div key={i} {...lineProps}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    );
                  })}
                </span>
              </div>
              {/* Show fade on side of codeblock if content overflows */}
              <div className="absolute w-8 top-[45px] right-0 bg-gradient-to-l from-midnight code-fade"></div>
            </pre>
          </div>
        )}
      </Highlight>
    </div>
  );
};
