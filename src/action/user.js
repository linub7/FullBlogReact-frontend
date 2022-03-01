export const getUserProfile = async (userId, token) =>
  await fetch(`${process.env.REACT_APP_API}/user/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllUsers = async () =>
  await fetch(`${process.env.REACT_APP_API}/users`, {
    method: 'GET',
  });

export const updateUser = async (userId, token, user) => {
  console.log('USER DATA UPDATED: ', user);
  return await fetch(`${process.env.REACT_APP_API}/user/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: user,
  });
};

export const deleteUser = async (userId, token) =>
  await fetch(`${process.env.REACT_APP_API}/user/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const followUser = async (userId, token, followId) =>
  await fetch(`${process.env.REACT_APP_API}/user/follow`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, followId }),
  });

export const unFollowUser = async (userId, token, unfollowId) =>
  await fetch(`${process.env.REACT_APP_API}/user/unfollow`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, unfollowId }),
  });

export const findPeople = async (token, userId) =>
  await fetch(`${process.env.REACT_APP_API}/user/findpeople/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
