export const signup = async (data) =>
  await fetch(`${process.env.REACT_APP_API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export const signin = async (data) =>
  await fetch(`${process.env.REACT_APP_API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export const signoutUser = async () =>
  await fetch(`${process.env.REACT_APP_API}/signout`, {
    method: 'GET',
  });
