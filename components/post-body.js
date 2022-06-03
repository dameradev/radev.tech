

export default function PostBody({ content }) {
  return (
    
    <div
      className={`post-content max-w-5xl mx-auto post text-xl `}
      dangerouslySetInnerHTML={{ __html: content.html }}
    />
  )
}
