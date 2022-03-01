export const forgotPassword = async (email) => {
  console.log('email: ', email);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/forgot-password`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );
    console.log('forgot password response: ', response);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const resetPassword = async (resetInfo) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/reset-password`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetInfo),
      }
    );
    console.log('forgot password response: ', response);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
