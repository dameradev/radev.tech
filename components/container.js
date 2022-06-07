export default function Container({ children, className }) {
  return <div className={`container mx-auto lg:px-10 ${className}`}>{children}</div>
}
