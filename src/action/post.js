export const createPost = async (userId, token, post) =>
  await fetch(`${process.env.REACT_APP_API}/post/new/${userId}`, {
    method: 'POST',
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    body: post,
  });

export const getAllPosts = async () =>
  await fetch(`${process.env.REACT_APP_API}/posts`, {
    method: 'GET',
  });

export const getPostsByUser = async (userId, token) =>
  await fetch(`${process.env.REACT_APP_API}/posts/by/${userId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

export const getSinglePost = async (postId) =>
  await fetch(`${process.env.REACT_APP_API}/post/${postId}`, {
    method: 'GET',
  });

export const updatePost = async (postId, token, data) => {
  console.log('POST DATA UPDATED: ', data);
  return await fetch(`${process.env.REACT_APP_API}/post/${postId}`, {
    method: 'PUT',
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    body: data,
  });
};

export const deletePost = async (postId, token) =>
  await fetch(`${process.env.REACT_APP_API}/post/${postId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const likePost = async (postId, userId, token) =>
  await fetch(`${process.env.REACT_APP_API}/post/like`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, postId }),
  });

export const unlikePost = async (postId, userId, token) =>
  await fetch(`${process.env.REACT_APP_API}/post/unlike`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, postId }),
  });

export const commentPost = async (comment, postId, userId, token) => {
  return await fetch(`${process.env.REACT_APP_API}/post/comment`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment, userId, postId }),
  });
};

export const unCommentPost = async (comment, postId, userId, token) =>
  await fetch(`${process.env.REACT_APP_API}/post/uncomment`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment, userId, postId }),
  });
