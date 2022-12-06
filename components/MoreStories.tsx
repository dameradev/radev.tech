import { getTimeToRead } from '../lib/timeToRead'
import PostPreview from './PostPreview'
import ProjectPreview from './ProjectPreview'

export default function MoreStories({ posts, isProject = false, className }) {
  return (
    <section>
      <div className={`grid grid-cols-1 sm:grid-cols-2 mb-14 lg:grid-cols-3  sm:gap-x-6 lg:gap-x-12 gap-y-10  mt-4 ${className} ${isProject ? "md:grid-cols-1 lg:grid-cols-1 gap-y-20" : ""}`}>
        {posts.map((post) => {
          const timeToRead = getTimeToRead(post.content)
          return !isProject ? (
            <PostPreview
              key={post.slug}
              post={post}
              title={post.title}
              coverImage={post.coverImage}
              slug={post.slug}
              excerpt={post.excerpt}
              timeToRead={timeToRead}
            />
          ): <ProjectPreview post={post} />
        })}
      </div>
    </section>
  )
}
