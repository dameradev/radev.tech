import Image from "next/image";

import Text from "./Text";
import { Fragment } from 'react';
import { CodeBlock } from './CodeBlock';


export const renderBlocks = (block) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p className="mt-4 leading-[3.2rem] md:leading-[3.6rem] text-lg md:text-xl  ">
          <Text text={value.text} />
          
        </p>
      );
    case "heading_1":
      return <h1 className="text-6xl">{value.text[0].text.content}</h1>;
    case "heading_2":
      return (
        <div className="relative">
          <a
            className="absolute top-[-100px] mb-20"
            id={value.text[0].text.content
              .split(" ")
              .join("-")
              .toLowerCase()
              .trim()}
          ></a>

          <h2
            data-id={value.text[0].text.content
              .split(" ")
              .join("-")
              .toLowerCase()}
            className="text-3xl lg:text-4xl mt-12 font-bold"
          >
            {value.text[0].href ? (
              <a
                target="_blank"
                href={value.text[0].href}
                className=" text-accent-8"
              >
                {value.text[0].text.content}
              </a>
            ) : (
              value.text[0].text.content
            )}
          </h2>
        </div>
      );
    case "heading_3":
      return (
        <h3 className="text-2xl mt-12 font-bold ">
          {value.text[0].text.content}
        </h3>
      );

    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li className="mt-2 text-lg md:text-xl leading-normal ">
          <Text text={value.text} />
        </li>
      );
    case "to_do":
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
    case "toggle":
      return (
        <details>
          <summary>{value.text}</summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption =
        value.caption.length >= 1 ? value.caption[0].plain_text : "";
      return (
        <figure className=" mt-0 px-2 py-5">
          <Image
            className="rounded-xl"
            // fill
            width={1200}
            height={800}
            alt={
              caption
                ? caption
                : "A visual depiction of what is being written about"
            }
            src={src}
          />
          {caption && (
            <figcaption className="text-center">{caption}</figcaption>
          )}
        </figure>
      );
    case "code":
      return (
        <CodeBlock
          fileName={value.caption?.[0]?.plain_text}
          language={value.language}
          code={value.text[0].text.content}
        />
      );
    case "callout":
      return (
        <div className="flex p-4 mb-4 space-x-4 bg-gray-100 rounded-lg bg-info-window mt-6 items-center">
          {value.icon && <span className="text-2xl">{value.icon.emoji}</span>}
          <div>
            <Text text={value.text} />
          </div>
        </div>
      );
    case "embed":
      const codePenEmbedKey = value.url.slice(value.url.lastIndexOf("/") + 1);
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
    case "table_of_contents":
      return (
        <>
          <div>TOC</div>
        </>
      );
    case "video":
      return "test"; //<YoutubeEmbed url={value.external.url} />;
    case "quote":
      return (
        
        <blockquote className="border-l-8 border-slate pl-8 py-4 text-xl italic my-8">
          <Text text={value.text} />
        </blockquote>
      );
    case "divider":
      return (
        <hr className="my-16 w-full border-none text-center h-10 before:content-['∿∿∿'] before:text-[#D1D5DB] before:text-2xl"></hr>
      );
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
}

