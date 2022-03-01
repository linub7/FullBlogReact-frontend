import { useState } from 'react';
import { forgotPassword } from '../auth';
import Menu from '../core/Menu';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChangeInput = (e) => {
    setEmail(e.target.value);
    setMessage('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    forgotPassword(email).then((data) => {
      if (data.error) {
        console.log(data.error);
        setError(data.error);
      } else {
        console.log(data.message);
        setMessage(data.message);
        setEmail('');
      }
    });
  };
  return (
    <>
      <Menu />
      <div className="container">
        <h2 className="mt-5 mb-5">Ask for Password Reset</h2>

        {message && <h4 className="bg-success text-white">{message}</h4>}
        {error && <h4 className="bg-warning text-white">{error}</h4>}

        <form onSubmit={handleSubmit}>
          <div className="form-group mt-5">
            <input
              type="email"
              className="form-control"
              placeholder="Your email address"
              value={email}
              name="email"
              onChange={handleChangeInput}
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-raised btn-primary">
            Send Password Rest Link
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
