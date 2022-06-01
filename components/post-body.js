

export default function PostBody({ content }) {
  console.log(content)
  return (
    
    <div
      className={`post-content max-w-7xl mx-auto post `}
      dangerouslySetInnerHTML={{ __html: content.html }}
    />
  )
}
