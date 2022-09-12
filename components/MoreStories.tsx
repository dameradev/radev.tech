import { getTimeToRead } from '../lib/timeToRead'
import PostPreview from './PostPreview'

export default function MoreStories({ posts, className }) {
  return (
    <section>
      <div className={`grid grid-cols-1 md:grid-cols-2 mb-14 lg:grid-cols-3  md:gap-x-6 lg:gap-x-12 gap-y-10  mt-4 ${className}`}>
        {posts.map((post) => {
          const timeToRead = getTimeToRead(post.content)
          return (
            <PostPreview
              key={post.slug}
              post={post}
              title={post.title}
              coverImage={post.coverImage}
              slug={post.slug}
              excerpt={post.excerpt}
              timeToRead={timeToRead}
            />
          )
        })}
      </div>
    </section>
  )
}
