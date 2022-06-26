import React from 'react';
import styled from 'styled-components';


const TableOfContentsStyles = styled.div`
ul {
  list-style: none;
}
  li {
    margin-left: 0;
    position: relative;

    &:not(:first-of-type) {
      /* margin: 1rem 0; */
    }
    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 7px;
      left: -18px;
      width: 10px;
      height: 10px;
      border: 1px solid var(--color-text);
      border-radius: 50%;

      &.active {
        background: var(--color-secondary);
        border: none;
      }
    }
  }
`

const TableOfContents = ({ nestedHeadings, className }) => {
  return (
    <TableOfContentsStyles className={className}>

      <div className='flex flex-col  sticky top-30 table-contents pr-4'>
        <p className='text-xl mb-4 font-bold'>Contents</p>
        <ul >

          {nestedHeadings.map((heading, index) => (
            <li>
              <a href={`#${heading.id}`}>{heading.innerText}</a>
            </li>

          ))}
        </ul>
      </div>
    </TableOfContentsStyles>
  );
};

export default TableOfContents;