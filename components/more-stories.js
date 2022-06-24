import PostPreview from '../components/post-preview'

export default function MoreStories({ posts, className }) {
  return (
    <section>
      
      <div className={`grid grid-cols-1 mb-14 lg:grid-cols-2  md:gap-x-6 lg:gap-x-12 gap-y-10  mt-14 border-r-[1px] pr-10 ${className}`}>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            post={post}
            title={post.title.rendered}
            coverImage={post.coverImage}
            date={post.date}
            authors={post.authors}
            slug={post.slug}
            excerpt={post.excerpt.rendered}
          />
        ))}
      </div>
    </section>
  )
}
