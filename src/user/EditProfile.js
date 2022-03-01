import { useNavigate, useParams } from 'react-router-dom';
import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { getUserProfile, updateUser } from '../action/user';
import Menu from '../core/Menu';
import { toast } from 'react-toastify';
import DefaultImage from '../images/avatar.png';

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    about: '',
  });
  const { id, name, email, password, about } = user;
  const navigate = useNavigate();
  const params = useParams();
  const token = cookie.get('token');

  const userFromLocalStorage =
    localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

  const loadUserProfile = async () => {
    setLoading(true);
    try {
      const response = await getUserProfile(params.id, token);
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
      }

      setUser({
        id: data._id,
        name: data.name,
        email: data.email,
        password: '',
        about: data.about,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    if (token == null) {
      return navigate('/signin');
    }

    loadUserProfile();
  }, [params.id]);

  if (user && userFromLocalStorage && id !== userFromLocalStorage._id) {
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

  const handleInputChange = (name) => (e) => {
    setUser({
      ...user,
      [name]: e.target.value,
    });
  };

  const handleProfilePhoto = (e) => {
    if (e.target.files[0].size < '1000000') {
      setProfilePhoto(e.target.files[0]);
    } else {
      toast.error(
        'Image size is too large.Please resize or choose another photo'
      );
    }
  };

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();

    let userData = new FormData();

    userData.append('profilePhoto', profilePhoto);
    userData.append('name', name);
    userData.append('email', email);
    userData.append('about', about);
    password && password.length >= 6 && userData.append('password', password);
    console.log([...userData]);

    try {
      const response = await updateUser(params.id, token, userData);
      const data = await response.json();
      if (data.message) {
        return toast.error(data.message);
      } else if (data.error) {
        return toast.error(data.error);
      }
      if (typeof window !== 'undefined') {
        const userData = {
          name: data.name,
          email: data.email,
          _id: data._id,
        };
        data && localStorage.setItem('user', JSON.stringify(userData));
      }
      toast.success('Profile Edited Successfully 👍');
      setTimeout(() => {
        navigate(`/user/${params.id}`);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const photoUrl = id
    ? `${process.env.REACT_APP_API}/user/image/${id}?${new Date().getTime()}`
    : DefaultImage;

  const editProfileForm = () => (
    <form onSubmit={handleEditProfileSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-primary">
          Profile Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePhoto}
            hidden
          />
        </label>
      </div>
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
        <label htmlFor="about" className="text-muted">
          About
        </label>
        <textarea
          id="about"
          value={about}
          type="text"
          className="form-control"
          onChange={handleInputChange('about')}
        ></textarea>
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
        />
      </div>
      <button
        type="submit"
        disabled={!name || !email || (password && password.length < 6)}
        className="btn btn-raised btn-primary"
      >
        Update
      </button>
    </form>
  );

  return (
    <>
      <Menu />
      {loading ? (
        <div className="container">
          <div className="mt-5 mb-5">Loading...</div>
        </div>
      ) : (
        <div className="container">
          <h1 className="mt-5 mb-5">Edit Profile</h1>
          <img
            src={photoUrl}
            alt={name}
            style={{ width: '35%' }}
            onError={(i) => (i.target.src = `${DefaultImage}`)}
            className="img-thumbnail mb-2"
          />
          {editProfileForm()}
        </div>
      )}
    </>
  );
};

export default EditProfile;
