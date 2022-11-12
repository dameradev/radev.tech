"use client"
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
const Highliter = ({content}) => {
  return (
    <SyntaxHighlighter language="javascript" style={docco}>

      {content[0].code.text[0].plain_text}```
    </SyntaxHighlighter>
  );
};

export default Highliter;