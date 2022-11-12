
"use client"
import React, { useContext } from "react";
// import { jsx } from "@emotion/core";
import Highlight, { defaultProps, Prism } from "prism-react-renderer";
import { useCopyToClipboard } from '../lib/hooks/useCopyToClipboard';
import { ThemeContext } from '../lib/themeContext';
import { FaCopy } from 'react-icons/fa';
import vsDark from "prism-react-renderer/themes/vsDark";
import vsLight from "prism-react-renderer/themes/vsLight";

// import { useLayers, useCodeTheme } from "@sens8/tokens";


export const CodeBlock = ({ code, language, metastring = "", fileName }) => {
  const [isCopied, handleCopy] = useCopyToClipboard(1000, code);
  // const shouldHighlightLine = calculateLinesToHighlight(metastring);


  const { toggle } = useContext(ThemeContext)
  let languageFormatted, color;
  return (
    <div>
      <Highlight
        Prism={Prism}
        code={code}
        language={language}
      theme={!toggle ? vsDark : vsLight}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div className={`relative not-prose my-10 `} >
            <pre
              className={`rounded-xl relative overflow-hidden bg-slate-800 ${className}`}
              style={style}
            >
              <div className="relative flex text-xs leading-6 ">
                <div className="flex items-center  px-4 pt-1 mt-2  border-t border-b border-t-transparent border-b-slate-400 w-full justify-between">
                  <p className={`${toggle ? "bg-zinc-800" : "bg-zinc-200"} h-full pt-2 pb-2 px-4`}><span className={color}>
                    {/* {JSON.stringify(languageFormatted).replace(/['"]+/g, '').toUpperCase()} */}
                  </span> <span className='text-current'>{fileName}</span></p>
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

                    // if (shouldHighlightLine(i)) {
                    //   lineProps.className = `${lineProps.className} highlight-line`;
                    // }

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




export default CodeBlock;

