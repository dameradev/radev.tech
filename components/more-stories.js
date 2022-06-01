import PostPreview from '../components/post-preview'

export default function MoreStories({ posts }) {
  return (
    <section>
      <h2 className="mt-6 md:my-12 text-3xl md:text-6xl leading-tight ">
        More Content
      </h2>
      <div className="grid grid-cols-1 mb-14 sm:grid-cols-2  md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 md:mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            authors={post.authors}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
