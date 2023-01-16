import Image from 'next/image';
import Highlight, { defaultProps } from 'prism-react-renderer';
import React, { Fragment, useContext, useState } from 'react';
import { useCopyToClipboard } from '../lib/hooks/useCopyToClipboard';
import { ThemeContext } from '../lib/themeContext';
import { Text } from '../pages/posts/[slug]';

import vsDark from "prism-react-renderer/themes/vsDark";
import vsLight from "prism-react-renderer/themes/vsLight";
import { FaCopy } from 'react-icons/fa';

const PostContent = ({ content, className = ""}) => {

  return (
    <>
      <TableOfContent className="" />
      {content.map((block) => (
        <div className={`post-content ${className}`}>    
          {renderBlocks(block)} 
          {/* dame   */}
          {/* {console.log(block)} */}
        </div>
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
        <p className='mt-4 leading-[3.2rem] md:leading-[3.6rem] text-lg md:text-xl  ' >

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
      // console.log(value, 'headerng 2')
      return (
        <div className="relative">
          <a className="absolute top-[-100px] mb-20" id={value.text[0].text.content.split(" ").join('-').toLowerCase().trim()}>
          </a>

          <h2 data-id={value.text[0].text.content.split(" ").join('-').toLowerCase()} className='text-3xl lg:text-4xl mt-12 font-bold'>
            {value.text[0].href ?
              <a target="_blank" href={value.text[0].href} className=' text-accent-8'>
                {value.text[0].text.content}
              </a>
              :
              value.text[0].text.content}
          </h2>
        </div>
      );
    case 'heading_3':
      return (
        <h3 className="text-xl mt-6 font-bold ">
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

        <div className="flex p-4 mb-4 space-x-4 bg-gray-100 rounded-lg bg-info-window mt-6 items-center" >
          {value.icon && <span className='text-2xl'>{value.icon.emoji}</span>}
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
      console.log(block, 'toc')
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
        <blockquote className="p-4 rounded-r-lg italic">
          <Text text={value.text} />
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
          <div className={`relative not-prose mb-10 max-h-[60vh] md:max-h-[70rem] overflow-scroll  ${!toggle ? "border-red-100 border-[1px]" : ""}`} >
            <pre
              className={`rounded-xl relative  min-h-full  bg-slate-800 ${className} relative`}
              style={style}
            >
              <div className=" flex text-xs leading-6  sticky top-0 left-0 bg-zinc-900 z-10">
                <div className="flex items-center  px-4 pt-1 mt-2  border-t border-b border-t-transparent border-b-slate-400 w-full justify-between ">
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


function useHeadings() {
  const [headings, setHeadings] = React.useState([]);
  React.useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".post-content h2, h3, h4, h5, h6"))
      // .filter((element) => element.id)
      .map((element, index) => {
        return {
          id: element.getAttribute('data-id'),
          text: !element.hasChildNodes ? element.innerHTML ?? "" : element.childNodes[0].textContent,
          level: Number(element.tagName.substring(1))
        }

      }

      );
    console.log(elements)
    setHeadings(elements);


  }, []);
  console.log(headings)
  return headings;
}

export function useScrollSpy(
 { activeId,
  setActiveId,
  ids,
  options}
) {

  const observer = React.useRef<IntersectionObserver>();
  React.useEffect(() => {
    const elements = ids.map((id) =>
      document.getElementById(id)
    );

    observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      entries?.forEach((entry, index) => {
        
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        } 
        // else if (entry.target.id === ids[0].id) {
        //   setActiveId(ids[0]);
        // }

        
       else if (window.scrollY < 400) {
          console.log(ids)
          setActiveId(ids[0]);
        }
      });

      console.log(options)
    }, options);
    


    elements?.forEach((el) => {
      if (el) {
        observer.current?.observe(el);
      }
    });
    return () => observer.current?.disconnect();
  }, [ids, options]);
  return activeId;
}


function TableOfContent({className}) {
  const headings = useHeadings();

  const[activeId, setActiveId] = useState("")

  const isActiveId = useScrollSpy(
    {
      ids: headings.map(({ id }) => id),
      options: { rootMargin: "0% 0% -10% 0%" },
      activeId,
      setActiveId
    }
  );

  
  // regex to check if number is odd
  const match = '(\s*\d*[13579]\s*)'
  
  return (
    <nav className={`lg:mt-32 mb-12 lg:fixed ${className} lg:w-[35rem] right-0 top-0 lg:border-r-2 mr-4 mt-10 md:mt-0`} >
      {headings.length ? <p className="text-xl mb-4">Table of contents</p> : ""}
      <ul className="sticky flex flex-col gap-2">
        {headings.map((heading, index) => (
          <li key={heading.id}      className={` ml-${heading.level === 3 ? "4" : "2"}   mr-0 pr-0 lg:${isActiveId === heading.id ? "border-r-4" : ""}`} >
            <a
          
              href={`#${heading.id}`}
              
            >
             {/* {heading.level === 2 ? index + 1 : `${index}.1` }.  */}
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
};