import { useEffect, useRef, useState } from 'react';

const TableOfContent = ({ className }) => {
  const headings = useHeadings();
  const [activeId, setActiveId] = useState("");

  const isActiveId = useScrollSpy({
    ids: headings.map(({ id }) => id),
    options: { rootMargin: "0% 0% -10% 0%" },
    activeId,
    setActiveId,
  });

console.log(isActiveId)
  return (
    <nav
      className={`lg:mt-32 mb-12 lg:fixed ${className} lg:w-[35rem] right-0 top-20 lg:border-r-2 mr-4 mt-10 md:mt-0`}
    >
      {headings.length ? <p className="text-xl mb-4">Table of contents</p> : ""}
      <ul className="sticky flex flex-col gap-2">
        {headings.map((heading, index) => (
          <li
            key={heading.id}
            className={` ml-${heading.level === 3 ? "4" : "2"}   mr-0 pr-0  border-r-4 border-transparent lg:${
              isActiveId === heading.id ? "border-r-4 border-white " : ""
            }`}
          >
            <a href={`#${heading.id}`}>
            {console.log(heading.id)}
              {/* {heading.level === 2 ? index + 1 : `${index}.1` }.  */}
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default TableOfContent;


function useHeadings() {
  const [headings, setHeadings] = useState([]);
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll(".post-content h2, h3, h4, h5, h6")
    )
      .map((element, index) => {
        return {
          id: element.getAttribute("data-id"),
          text: !element.hasChildNodes
            ? element.innerHTML ?? ""
            : element.childNodes[0].textContent,
          level: Number(element.tagName.substring(1)),
        };
      });
    setHeadings(elements);
  }, []);
  return headings;
}

function useScrollSpy({ activeId, setActiveId, ids, options }) {
  const observer = useRef<IntersectionObserver>();
  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id));

    observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      entries?.forEach((entry, index) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
        else if (window.scrollY < 400) {
          setActiveId(ids[0]);
        }
      });
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
