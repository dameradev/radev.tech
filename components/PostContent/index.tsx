import React from "react";
import TableOfContent from './TableOfContents';
import { renderBlocks } from './RenderBlocks';


const PostContent = ({ content, className = "" }) => {
  return (
    <>
      <TableOfContent className="" />
      {content.map((block) => (
        <div className={`post-content ${className}`}>
          {renderBlocks(block)}
        </div>
      ))}
    </>
  );
};

export default PostContent;