import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../action/post';
import { getAllUsers } from '../action/user';
import PostCard from '../components/PostCard';
import Menu from '../core/Menu';
import DefaultProfile from '../images/avatar.png';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    const response = await getAllPosts();
    const data = await response.json();
    console.log(data);
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const renderPosts = (posts) => (
    <div className="row">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          image={`${process.env.REACT_APP_API}/post/photo/${post._id}`}
        />
      ))}
    </div>
  );

  return (
    <>
      <Menu />
      <div className="container">
        {loading ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          <>
            <h2 className="mt-5 mb-5">Posts</h2>
            {posts && renderPosts(posts)}
          </>
        )}
      </div>
    </>
  );
};

export default Posts;
