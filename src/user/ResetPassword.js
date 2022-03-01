import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../auth';
import Menu from '../core/Menu';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const params = useParams();
  console.log(params);

  const changeInputHandler = (e) => {
    setNewPassword(e.target.value);
    setMessage('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword({
      newPassword,
      resetPasswordLink: params.resetPasswordToken,
    }).then((data) => {
      if (data.error) {
        console.log(data.error);
        setError(data.error);
      } else {
        console.log(data.message);
        setMessage(data.message);
        setNewPassword('');
      }
    });
  };

  return (
    <>
      <Menu />
      <div className="container">
        <h2 className="mt-5 mb-5">Reset your Password</h2>

        {message && <h4 className="bg-success">{message}</h4>}
        {error && <h4 className="bg-warning">{error}</h4>}

        <form onSubmit={handleSubmit}>
          <div className="form-group mt-5">
            <input
              type="password"
              className="form-control"
              placeholder="Your new password"
              value={newPassword}
              name="newPassword"
              onChange={changeInputHandler}
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-raised btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
