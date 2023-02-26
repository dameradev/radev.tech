import { useContext } from 'react';
import { FaCopy } from 'react-icons/fa';

import Highlight, { defaultProps } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';
import vsLight from 'prism-react-renderer/themes/vsLight';

import { ThemeContext } from '@/components/ThemeContext';
import { useCopyToClipboard } from '@/lib/hooks/useCopyToClipboard';

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

export const CodeBlock = ({ code, language, metastring = '', fileName }) => {
  const [isCopied, handleCopy] = useCopyToClipboard(1000, code);
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  const { toggle } = useContext(ThemeContext);
  let languageFormatted, color;
  switch (language) {
    case 'javascript':
      languageFormatted = 'JS';
      color = 'text-yellow-500';

      break;
    case 'typescript':
      languageFormatted = 'TS';
      color = 'text-blue-400';
      break;
    case 'css':
      languageFormatted = 'CSS';
      color = 'text-blue-400';
      break;
    case 'markup':
      languageFormatted = 'HTML';
      color = 'text-orange-600';
      break;
    default:
      languageFormatted = language;
      color = 'text-secondary';
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
          <div
            className={`relative not-prose mb-10 max-h-[60vh] md:max-h-[70rem] overflow-scroll  ${
              !toggle ? 'border-red-100 border-[1px]' : ''
            }`}
          >
            <pre
              className={`rounded-xl relative  min-h-full  bg-slate-800 ${className} relative`}
              style={style}
            >
              <div className=' flex text-xs leading-6  sticky top-0 left-0 bg-zinc-900 z-10'>
                <div className='flex items-center  px-4 pt-1 mt-2  border-t border-b border-t-transparent border-b-slate-400 w-full justify-between '>
                  <p
                    className={`${
                      toggle ? 'bg-zinc-800' : 'bg-zinc-200'
                    } h-full pt-2 pb-2 px-4`}
                  >
                    <span className={color}>
                      {JSON.stringify(languageFormatted)
                        .replace(/['"]+/g, '')
                        .toUpperCase()}
                    </span>{' '}
                    <span className='text-current'>{fileName}</span>
                  </p>
                  <button
                    className={`hidden md:inline-block group mb-2 mr-1 ${
                      isCopied ? 'text-secondary' : 'text-gray-400'
                    }`}
                    onClick={() => handleCopy()}
                  >
                    <span className='sr-only'>Copy code</span>
                    <FaCopy />
                  </button>
                </div>
              </div>
              <div className='relative w-auto p-5 overflow-auto prose text-gray-300 prose-full-width text-sm md:text-md'>
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
              <div className='absolute w-8 top-[45px] right-0 bg-gradient-to-l from-midnight code-fade'></div>
            </pre>
          </div>
        )}
      </Highlight>
    </div>
  );
};
