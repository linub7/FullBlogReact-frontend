import { Link } from 'react-router-dom';
import DefaultPostImage from '../images/post.png';

const PostCard = ({ post, image }) => {
  const posterId = post.postedBy ? post.postedBy._id : '';
  const posterName = post.postedBy ? post.postedBy.name : 'Unknown';
  return (
    <div className="card col-md-4 m-3" style={{ width: '18rem' }}>
      <img
        className="card-img-top"
        src={image}
        alt={post.name}
        onError={(i) => (i.target.src = `${DefaultPostImage}`)}
        style={{ width: '100%', height: '15vw', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body.substring(0, 50)}...</p>
        <br />
        <p className="font-italic mark">
          PostedBy: <Link to={`/user/${posterId}`}>{posterName}</Link>
          <br />
          on {new Date(post.createdAt).toDateString()}
        </p>
        <Link
          to={`/post/${post._id}`}
          className="btn btn-primary btn-raised btn-sm"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
