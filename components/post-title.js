export default function PostTitle({ children }) {
  return (
    <h1 className="text-4xl md:text-7xl lg:text-8xl tracking-tighter leading-tight md:leading-none mb-6 md:mb-12 text-center md:text-left">
      {children}
    </h1>
  )
}
