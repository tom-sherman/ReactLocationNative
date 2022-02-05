export async function fetchPosts() {
  await new Promise(r => setTimeout(r, 300));
  return await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(r => r.slice(0, 5));
}

export async function fetchPostById(postId: string) {
  await new Promise(r => setTimeout(r, 300));

  return await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  ).then(res => res.json());
}
