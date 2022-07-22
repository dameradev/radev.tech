export default function PostTitle({ children }) {
  return (
    <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight md:leading-none mb-6 md:mb-6 text-left font-bold">
      {children}
    </h1>
  )
}
