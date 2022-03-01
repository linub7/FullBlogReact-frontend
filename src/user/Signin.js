import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signin } from '../action/auth';
import cookie from 'js-cookie';
import Menu from '../core/Menu';

const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: 'linub7@gmail.com',
    password: '123456',
    error: '',
  });
  const { email, password } = values;

  const handleInputChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      const response = await signin(user);
      const data = await response.json();
      if (data.message) {
        return toast.error(data.message);
      } else if (data.error) {
        return toast.error(data.error);
      }
      if (typeof window !== 'undefined') {
        data.token && cookie.set('token', data.token);
        data.user && localStorage.setItem('user', JSON.stringify(data.user));
      }
      setValues({ ...values, name: '', email: '', password: '', error: '' });
      toast.success('Signin Success 👍');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const signinForm = () => (
    <form onSubmit={handleSigninSubmit}>
      <div className="form-group">
        <label htmlFor="email" className="text-muted">
          Email
        </label>
        <input
          id="email"
          value={email}
          type="email"
          className="form-control"
          onChange={handleInputChange('email')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="pass" className="text-muted">
          Password
        </label>
        <input
          placeholder="password must be at least 6 character"
          id="pass"
          value={password}
          type="password"
          className="form-control"
          onChange={handleInputChange('password')}
          required
        />
      </div>
      <button
        type="submit"
        disabled={!email || !password}
        className="btn btn-raised btn-primary"
      >
        Signin
      </button>
    </form>
  );
  return (
    <>
      <Menu />
      <div className="container">
        <h2 className="mt-5 mb-5">Signin</h2>
        {signinForm()}
        <p>
          <Link to="/forgot-password" className="btn btn-raised btn-danger">
            Forgot Password
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
