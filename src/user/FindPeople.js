import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { findPeople, followUser } from '../action/user';
import DefaultImage from '../images/avatar.png';
import Menu from '../core/Menu';
import { toast } from 'react-toastify';

const FindPeople = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const token = cookie.get('token');
  const userFromLocalStorage =
    localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

  const loadUsers = async () => {
    setLoading(true);
    const response = await findPeople(token, userFromLocalStorage._id);
    const data = await response.json();
    console.log(data);
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!token) {
      navigate('/signin');
    }
    loadUsers();
  }, [userFromLocalStorage._id, open]);

  const clickButton = async (user, index) => {
    try {
      const response = await followUser(
        userFromLocalStorage._id,
        token,
        user._id
      );
      const data = await response.json();
      let toFollow = users;
      toFollow.splice(index, 1);
      setUsers(toFollow);
      toast.success(`${user.name} Followed ✌️`);
      setOpen(true);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  if (!token && !userFromLocalStorage) {
    return (
      <>
        <Menu />
        {loading ? (
          <div className="container">
            <div className="mt-5 mb-5">Loading...</div>
          </div>
        ) : (
          <div className="container">
            <h1 className="mt-5 mb-5">You can not perform this action</h1>
          </div>
        )}
      </>
    );
  }

  const renderUsers = (users) => (
    <div className="row">
      {users.map((user, index) => (
        <div
          key={user._id}
          className="card col-md-4 m-3"
          style={{ width: '18rem' }}
        >
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API}/user/image/${user._id}`}
            alt={user.name}
            onError={(i) => (i.target.src = `${DefaultImage}`)}
            style={{ width: '100%', height: '15vw', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">
              {user.email}
              <br />
            </p>
            <Link
              to={`/user/${user._id}`}
              className="btn btn-primary btn-raised btn-sm"
            >
              View Profile
            </Link>

            <button
              onClick={() => clickButton(user, index)}
              className="btn btn-info btn-raised btn-sm float-right"
            >
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Menu />
      <div className="container">
        <h2 className="mt-5 mb-5">Find People</h2>
        {users && renderUsers(users)}
      </div>
    </>
  );
};

export default FindPeople;
