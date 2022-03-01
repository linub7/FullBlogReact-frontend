import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  commentPost,
  deletePost,
  getSinglePost,
  likePost,
  unCommentPost,
  unlikePost,
} from '../action/post';
import DefaultPostImage from '../images/post.png';
import Menu from '../core/Menu';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import DeletePostButton from './DeletePostButton';
import Comment from './Comment';

const SinglePost = () => {
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [post, setPost] = useState({
    _id: '',
    title: '',
    body: '',
    postedBy: {},
    comments: [],
  });
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const token = cookie.get('token');
  const navigate = useNavigate();

  const checkInitLike = (obj) => obj._id === userFromLocalStorage._id;

  const loadSinglePost = async () => {
    setLoading(true);
    try {
      const response = await getSinglePost(
        window.location.pathname.split('/')[2]
      );
      const data = await response.json();
      console.log(data);
      setPost(data);
      setLikes(data.likes.length);
      setIsLiked(data.likes.some(checkInitLike));

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const userFromLocalStorage =
    localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    loadSinglePost();
  }, [params.id, post.comments.length]);

  const handleDeletePost = async () => {
    const answer = window.confirm('Are you Sure?');
    if (answer) {
      console.log('userFromLocalStorage._id: ', userFromLocalStorage._id);
      console.log('user._id : ', post._id);
      if (post.postedBy._id === userFromLocalStorage._id) {
        try {
          const response = await deletePost(post._id, token);
          const data = await response.json();
          console.log(data);
          toast.success(data.message);
          setTimeout(() => {
            navigate('/posts');
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleLike = async () => {
    try {
      if (token) {
        console.log('like');
        const response = await likePost(
          post._id,
          userFromLocalStorage._id,
          token
        );
        const data = await response.json();
        setIsLiked(true);
        setLikes(data.likes.length);
      } else {
        toast.error('You have to signin to like post');
        setTimeout(() => {
          navigate('/signin');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async () => {
    try {
      if (token) {
        console.log('unlike');
        const response = await unlikePost(
          post._id,
          userFromLocalStorage._id,
          token
        );
        const data = await response.json();
        setIsLiked(false);
        setLikes(data.likes.length);
      } else {
        toast.error('You have to signin to unlike post');
        setTimeout(() => {
          navigate('/signin');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      if (token) {
        const response = await commentPost(
          comment,
          post._id,
          userFromLocalStorage._id,
          token
        );
        const data = await response.json();
        setPost(data);
        setComment('');
      } else {
        navigate('/signin');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (cm) => {
    try {
      if (token) {
        const answer = window.confirm('Are You Sure?');
        if (answer) {
          const response = await unCommentPost(
            cm,
            post._id,
            userFromLocalStorage._id,
            token
          );
          const data = await response.json();
          console.log(data);
          setPost(data);
        }
      } else {
        navigate('/signin');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderPost = (post) => (
    <div className="card-body">
      <h1 className="mt-2 mb-2">{post.title}</h1>
      <img
        src={`${process.env.REACT_APP_API}/post/photo/${post._id}`}
        alt={post.title}
        onError={(i) => (i.target.src = `${DefaultPostImage}`)}
        className="img-thumbnail mb-3"
        style={{
          height: '300px',
          width: '100%',
          objectFit: 'cover',
        }}
      />
      {isLiked ? (
        <div className="form-inline">
          <i
            onClick={handleUnlike}
            className="fas fa-thumbs-up text-success"
            style={{
              padding: '15px',
              borderRadius: '50%',
              fontSize: '30px',
              cursor: 'pointer',
            }}
          ></i>
          <h3>{likes} Like</h3>
        </div>
      ) : (
        <div className="form-inline">
          <i
            onClick={handleLike}
            className="far fa-thumbs-up bg-white"
            style={{
              padding: '15px',
              borderRadius: '50%',
              fontSize: '30px',
              cursor: 'pointer',
            }}
          ></i>
          <h3>{likes} Like</h3>
        </div>
      )}
      <p className="card-text">{post.body}</p>
      <br />
      <p className="font-italic mark">
        Posted by{' '}
        <Link to={`/user/${post.postedBy._id}`}>{post.postedBy.name} </Link>
      </p>
      <div className="d-inline-block">
        <Link to={`/`} className="btn btn-raised btn-primary btn-sm mr-5">
          Back to posts
        </Link>

        {post &&
        userFromLocalStorage &&
        post.postedBy._id === userFromLocalStorage._id ? (
          <>
            <Link
              to={`/post/edit/${post._id}`}
              className="btn btn-raised btn-warning btn-sm mr-5"
            >
              Update Post
            </Link>
            <DeletePostButton handleDeletePost={handleDeletePost} />
          </>
        ) : (
          <Comment
            handleSubmitComment={handleSubmitComment}
            comment={comment}
            handleCommentInputChange={handleCommentInputChange}
          />
        )}
        <h3>Comments</h3>
        {post &&
          post.comments &&
          post.comments.map((cm) => (
            <ul className="list-group" key={cm._id}>
              <div className="form-inline">
                <li className="list-group-item mr-auto">{cm.comment}</li>
                {cm &&
                  userFromLocalStorage &&
                  cm.commentedBy === userFromLocalStorage._id && (
                    <i
                      onClick={() => handleDeleteComment(cm)}
                      className="fas fa-times"
                      style={{
                        color: 'red',
                        cursor: 'pointer',
                        padding: '20px',
                      }}
                    ></i>
                  )}
              </div>
            </ul>
          ))}
      </div>
    </div>
  );

  return (
    <>
      <Menu />
      <div className="container">
        {loading ? 'Loading...' : <>{post && renderPost(post)}</>}
      </div>
    </>
  );
};

export default SinglePost;
