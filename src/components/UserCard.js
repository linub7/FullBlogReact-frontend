import { Link } from 'react-router-dom';
import DefaultImage from '../images/avatar.png';

const UserCard = ({ user, image }) => {
  return (
    <div
      key={user._id}
      className="card col-md-4 m-3"
      style={{ width: '18rem' }}
    >
      <img
        className="card-img-top"
        src={image}
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
      </div>
    </div>
  );
};

export default UserCard;
