/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import cookie from 'js-cookie';
import { signoutUser } from '../action/auth';

const Menu = () => {
  const user =
    localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

  const nickname = user && user.name.split(' ')[0];

  const signout = async () => {
    cookie.remove('token');
    localStorage.removeItem('user');
    window.location.href = '/signin';
    await signoutUser();
  };

  const path = window.location.pathname;

  return (
    <div>
      {user !== null && (
        <ul className="nav nav-tabs bg-primary pb-1">
          <li className="nav-item mr-auto">
            <Link
              className="nav-link"
              to="/"
              style={{ color: path === '/' ? 'orange' : '#ffffff' }}
            >
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to={`/posts`}
              style={{ color: path === `/posts` ? 'orange' : '#ffffff' }}
            >
              Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={`/post/create`}
              style={{ color: path === `/post/create` ? 'orange' : '#ffffff' }}
            >
              Create Post
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={`/users`}
              style={{ color: path === `/users` ? 'orange' : '#ffffff' }}
            >
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={`/findpeople`}
              style={{ color: path === `/findpeople` ? 'orange' : '#ffffff' }}
            >
              Find People
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={`/user/${user._id}`}
              style={{ color: path === `/user` ? 'orange' : '#ffffff' }}
            >
              {`${nickname}'s Profile`}
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={signout}
              style={{ cursor: 'pointer' }}
            >
              Signout
            </a>
          </li>
        </ul>
      )}
      {user === null && (
        <ul className="nav nav-tabs bg-primary pb-1">
          <li className="nav-item mr-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/signin">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Register
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
