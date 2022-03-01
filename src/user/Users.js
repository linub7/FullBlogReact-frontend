import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../action/user';
import UserCard from '../components/UserCard';
import Menu from '../core/Menu';
import DefaultProfile from '../images/avatar.png';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    const response = await getAllUsers();
    const data = await response.json();
    console.log(data);
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const renderUsers = (users) => (
    <div className="row">
      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          image={`${process.env.REACT_APP_API}/user/image/${user._id}`}
        />
      ))}
    </div>
  );

  return (
    <>
      <Menu />
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>
        {users && renderUsers(users)}
      </div>
    </>
  );
};

export default Users;
