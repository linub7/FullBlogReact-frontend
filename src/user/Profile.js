import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import cookie from 'js-cookie';
import { deleteUser, getUserProfile } from '../action/user';
import Menu from '../core/Menu';

import DeleteUser from './DeleteUser';
import { signoutUser } from '../action/auth';
import DefaultImage from '../images/avatar.png';
import FollowProfileButton from '../components/FollowProfileButton';
import ProfileTabs from './ProfileTabs';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [following, setFollowing] = useState(false);
  const [image, setImage] = useState('');
  const [user, setUser] = useState({
    following: [],
    followers: [],
  });
  const navigate = useNavigate();
  const params = useParams();
  const token = cookie.get('token');
  const userFromLocalStorage =
    localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

  const { name, email, createdAt, _id } = user;

  const loadUserProfile = async () => {
    setLoading(true);
    try {
      const response = await getUserProfile(params.id, token);
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
      }
      console.log(data);
      let following = checkFollowing(data);
      setFollowing(following);
      setUser(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const loadImage = () => {
    setLoading(true);
    try {
      setImage(`${process.env.REACT_APP_API}/user/image/${params.id}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!token) {
      navigate('/signin');
    } else {
      loadUserProfile();
      loadImage();
    }
  }, [params.id, user._id]);

  const handleDeleteProfile = async () => {
    const answer = window.confirm('Are you Sure?');
    if (answer) {
      console.log('userFromLocalStorage._id: ', userFromLocalStorage._id);
      console.log('user._id : ', user._id);
      if (user._id === userFromLocalStorage._id) {
        try {
          await deleteUser(user._id, token);
          cookie.remove('token');
          localStorage.removeItem('user');
          window.location.href = '/signup';
          await signoutUser();
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const photoUrl = _id
    ? `${process.env.REACT_APP_API}/user/image/${_id}?${new Date().getTime()}`
    : DefaultImage;

  // check follow
  const checkFollowing = (user) => {
    const match = user.followers.find(
      (follower) => follower._id === userFromLocalStorage._id
    );
    return match;
  };

  const clickFollowButton = (callApi) => {
    const userId = userFromLocalStorage._id;

    callApi(userId, token, user._id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setUser(data);
        setFollowing(!following);
      }
    });
  };

  if (!token) {
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

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            {loading ? (
              'Loading...'
            ) : (
              <>
                <img
                  src={photoUrl}
                  alt={name}
                  style={{
                    width: '100%',
                    height: '20rem',
                    objectFit: 'cover',
                    borderRadius: '5px',
                  }}
                  onError={(i) => (i.target.src = `${DefaultImage}`)}
                  className="mb-2"
                />
              </>
            )}
          </div>
          <div className="col-md-6">
            <div className="lead">
              <p>Name: {name}</p>
              <p>Email: {email}</p>
              <p>Joined {new Date(createdAt).toDateString()}</p>
            </div>
            {user && user._id === userFromLocalStorage._id ? (
              <div className="d-inline-block">
                <Link
                  className="btn btn-raised btn-success mr-5"
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>
                <DeleteUser handleDeleteProfile={handleDeleteProfile} />
              </div>
            ) : (
              <FollowProfileButton
                following={following}
                onButtonClick={clickFollowButton}
              />
            )}
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <hr />
            <p className="lead">{user.about}</p>
            <hr />
            <ProfileTabs
              followers={user.followers}
              following={user.following}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
