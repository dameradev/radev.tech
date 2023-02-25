const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value, index) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        key={index}
        className={`${[
          code &&
            'bg-code text-secondary px-2 py-[2px] rounded-md text-md md:text-lg ',
        ].join()}
          ${[bold && 'font-bold'].join()} 
          ${[italic && 'italic'].join()}
        `}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? (
          <a className='text-secondary' href={text.link.url}>
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    );
  });
};
export default Text;