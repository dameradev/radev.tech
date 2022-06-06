import PostPreview from '../components/post-preview'

export default function MoreStories({ posts }) {
  return (
    <section>
      
      <div className="grid grid-cols-1 mb-14 sm:grid-cols-2  md:gap-x-6 lg:gap-x-12 gap-y-10  mt-14 border-r-[1px] pr-10">
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
