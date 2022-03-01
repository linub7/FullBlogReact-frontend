import { useNavigate, useParams } from 'react-router-dom';
import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import Menu from '../core/Menu';
import { toast } from 'react-toastify';
import { getSinglePost, updatePost } from '../action/post';
import DefaultPostImage from '../images/post.png';

const EditPost = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    _id: '',
    title: '',
    body: '',
    postedBy: {},
  });
  const { title, body } = post;
  const [postPhoto, setPostPhoto] = useState('');
  const params = useParams();

  const navigate = useNavigate();
  const token = cookie.get('token');

  const loadSinglePost = async () => {
    setLoading(true);
    try {
      const response = await getSinglePost(params.id);
      const data = await response.json();
      console.log(data);
      setPost(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const userFromLocalStorage =
    localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!token) {
      navigate('/signin');
    }
    loadSinglePost();
  }, [params.id]);

  if (
    post &&
    userFromLocalStorage &&
    post.postedBy._id !== userFromLocalStorage._id
  ) {
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
      const response = await updatePost(post._id, token, postData);
      const data = await response.json();
      if (data.message) {
        return toast.error(data.message);
      } else if (data.error) {
        return toast.error(data.error);
      }
      toast.success('Post Edited Successfully 👍');
      setTimeout(() => {
        navigate(`/posts`);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const photoUrl = post._id
    ? `${process.env.REACT_APP_API}/post/photo/${
        post._id
      }?${new Date().getTime()}`
    : DefaultPostImage;

  const editPostForm = () => (
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
        Edit Post
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
          <h1 className="mt-5 mb-5">Edit Post</h1>
          <img
            src={photoUrl}
            alt={post.title}
            style={{ width: '35%' }}
            onError={(i) => (i.target.src = `${DefaultPostImage}`)}
            className="img-thumbnail mb-2"
          />
          {editPostForm()}
        </div>
      )}
    </>
  );
};

export default EditPost;
