import { useNavigate, useParams } from 'react-router-dom';
import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../action/user';
import Menu from '../core/Menu';
import { toast } from 'react-toastify';
import { createPost } from '../action/post';

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    title: '',
    body: '',
  });
  const { title, body } = post;
  const [postPhoto, setPostPhoto] = useState('');
  const [user, setUser] = useState({});
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const token = cookie.get('token');

  const userFromLocalStorage =
    localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

  const loadUserProfile = async () => {
    setLoading(true);
    try {
      const response = await getUserProfile(userFromLocalStorage._id, token);
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
      }

      setUser(data);
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
  }, [userFromLocalStorage && userFromLocalStorage._id]);

  if (user && userFromLocalStorage && user._id !== userFromLocalStorage._id) {
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
    setPost({
      ...post,
      [name]: e.target.value,
    });
  };

  const handlePostPhoto = (e) => {
    if (e.target.files[0].size < 1000000) {
      setPostPhoto(e.target.files[0]);
    } else {
      toast.error(
        'Image size is too large.Please resize or choose another photo'
      );
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    let postData = new FormData();

    postData.append('photo', postPhoto);
    postData.append('title', title);
    postData.append('body', body);

    console.log([...postData]);

    try {
      const response = await createPost(user._id, token, postData);
      const data = await response.json();
      if (data.message) {
        return toast.error(data.message);
      } else if (data.error) {
        return toast.error(data.error);
      }
      setPost(data);
      toast.success('Post Created Successfully 👍');
      setTimeout(() => {
        navigate(`/`);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  //   const photoUrl = user._id
  //     ? `${process.env.REACT_APP_API}/user/image/${user._id}?${new Date().getTime()}`
  //     : DefaultImage;

  const createPostForm = () => (
    <form onSubmit={handleSubmitPost}>
      <div className="form-group">
        <label className="btn btn-outline-primary">
          Post Photo
          <input
            type="file"
            accept="image/*"
            onChange={handlePostPhoto}
            hidden
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="title" className="text-muted mb-1">
          Title
        </label>
        <input
          id="title"
          value={title}
          type="text"
          minLength="4"
          maxLength="150"
          className="form-control"
          onChange={handleInputChange('title')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="body" className="text-muted">
          Body
        </label>
        <textarea
          id="body"
          value={body}
          type="text"
          className="form-control"
          onChange={handleInputChange('body')}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={!title || !body || body.length < 5}
        className="btn btn-raised btn-primary"
      >
        Create Post
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
          <h1 className="mt-5 mb-5">Create Post</h1>
          {/* <img
            src={photoUrl}
            alt={name}
            style={{ width: '35%' }}
            onError={(i) => (i.target.src = `${DefaultImage}`)}
            className="img-thumbnail mb-2"
          /> */}
          {createPostForm()}
        </div>
      )}
    </>
  );
};

export default CreatePost;
