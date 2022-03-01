import { useState } from 'react';
import { toast } from 'react-toastify';
import { signup } from '../action/auth';
import Menu from '../core/Menu';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
  });
  const { name, email, password } = values;

  const handleInputChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
    };
    try {
      const response = await signup(user);
      const data = await response.json();
      if (data.message) {
        data.message === 'Signup success! Please login'
          ? toast.success(data.message)
          : toast.error(data.message);
      } else if (data.error) {
        toast.error(data.error);
      }
      setValues({ ...values, name: '', email: '', password: '', error: '' });
    } catch (err) {
      console.log(err);
    }
  };

  const signupForm = () => (
    <form onSubmit={handleRegisterSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="text-muted mb-1">
          Name
        </label>
        <input
          id="name"
          value={name}
          type="text"
          className="form-control"
          onChange={handleInputChange('name')}
          required
        />
      </div>
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
        disabled={!name || !email || !password}
        className="btn btn-raised btn-primary"
      >
        Submit
      </button>
    </form>
  );
  return (
    <>
      <Menu />
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>
        {signupForm()}
      </div>
    </>
  );
};

export default Signup;
