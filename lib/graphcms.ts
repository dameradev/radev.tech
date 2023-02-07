async function fetchAPI(query, { variables = {}, preview = {} } = {}) {
  // console.log(preview)
  const res = await fetch(process.env.GRAPHCMS_PROJECT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        !preview
          ? process.env.GRAPHCMS_DEV_AUTH_TOKEN
          : process.env.GRAPHCMS_PROD_AUTH_TOKEN
      }`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const json = await res.json()

  if (json.errors) {
    // console.log(process.env.NEXT_EXAMPLE_CMS_GCMS_PROJECT_ID)
    console.error(json.errors)
    // throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String!, $stage: Stage!) {
      post(where: {slug: $slug}, stage: $stage) {
        slug
      }
    }`,
    {
      preview: true,
      variables: {
        stage: 'DRAFT',
        slug,
      },
    }
  )
  return data.post
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts {
        slug
      }
    }
  `)
  return data.posts
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    {
      posts(orderBy: date_DESC, first: 20) {
        title
        slug
        date
        excerpt
        authors {
          name
          picture {
            url(transformation: {image: {resize: {fit: crop, width: 100, height: 100}}})
          }
        }
       
        coverImage {
          url(transformation: {
            image: {
              resize: {
                fit:clip,
                width:850,
                height:500
              }
            }
          })
        }
      
      }
    }
  `,
    { preview }
  )
  return data.posts
}

export async function getPostAndMorePosts(slug, preview) {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String!, $stage: Stage!) {
      post(stage: $stage, where: {slug: $slug}) {
        title
        slug
        content {
          html
        }
        date
        ogImage: coverImage {
          url(transformation: {image: {resize: {fit: crop, width: 1000, height: 600}}})
        }
        coverImage {
          url(transformation: {image: {resize: {fit: max, width: 1000, height: 600}}})
        }
        authors {
          name
          picture {
            url(transformation: {image: {resize: {fit: crop, width: 100, height: 100}}})
          }
        }
        
      }
      morePosts: posts(orderBy: date_DESC, first: 6, where: {slug_not_in: [$slug]}) {
        title
        slug
        
        date
        coverImage {
          url(transformation: {image: {resize: {fit: crop, width: 1000, height: 600}}})
        }
        authors {
          name
          picture {
            url(transformation: {image: {resize: {fit: crop, width: 100, height: 100}}})
          }
        }
      }
    }
  `,
    {
      preview,
      variables: {
        stage: preview ? 'DRAFT' : 'PUBLISHED',
        slug,
      },
    }
  )
  return data
}

export async function getAllTags(preview) {
  const data = await fetchAPI(
    `
    {
      tags {
        name
      }
    }
  `,
    { preview }
  )
  return data.tags
}
