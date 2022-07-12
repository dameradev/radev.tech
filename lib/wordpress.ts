// /utils/wordpress.js

const BASE_URL = 'https://www.tum.thz.mybluehost.me/wp-json/wp/v2';


export async function getPosts() {
  const postsRes = await fetch(BASE_URL + '/posts?_embed&per_page=15');
  const posts = await postsRes.json();
  return posts;
}

export async function getPost(slug) {
  const posts = await getPosts();
  const postArray = posts.filter((post) => post.slug == slug);
  const post = postArray.length > 0 ? postArray[0] : null;
  return post;
}

// fetch posts by tag
export async function getPostsByTag(tag) {
  console.log(tag)
  const postsRes = await fetch(BASE_URL + `/posts?_embed&tags=${tag}`);
  console.log(postsRes)
  const posts = await postsRes.json();
  return posts;
}

// fetch TAGS
export async function getTags() {
  const tagsRes = await fetch(BASE_URL + '/tags');
  const tags = await tagsRes.json();
  return tags;
}

// fetch single tag
export async function getTag(slug) {
  const tags = await getTags();
  const tagArray = tags.filter((tag) => tag.slug == slug);
  const tag = tagArray.length > 0 ? tagArray[0] : null;

  return tag;
}

// post a comment 
export async function postComment(postId, comment, name, email) {
  const commentRes = await fetch(BASE_URL + `/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      post: postId,
      content: comment,
      author_name: name,
      author_email: email,
    })
  });
  const response = await commentRes.json();
  return response;
}

export async function getSlugs(type) {
  let elements = [];
  switch (type) {
    case 'posts':
      elements = await getPosts();
      break;
    case 'tags':
      elements = await getTags();
      break;
  }
  const elementsIds = elements.map((element) => {
    return {
      params: {
        slug: element.slug,
      },
    };
  });
  return elementsIds;
}

export function getDate(date) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export const getFeaturedImage = (post) => post['_embedded']['wp:featuredmedia']?.[0];