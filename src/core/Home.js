import { useEffect, useState } from 'react';
import { getAllPosts } from '../action/post';
import PostCard from '../components/PostCard';
import Posts from '../post/Posts';
import Menu from './Menu';
const Home = () => {
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
      <div
        className="p-4 shadow-4 rounded-3"
        style={{ backgroundColor: 'hsl(0, 0%, 94%)' }}
      >
        <h2>Home</h2>
        <p className="lead">Welcome to React Frontend</p>
      </div>
      <div className="container">
        <div className="container">
          {loading ? (
            <div>
              <h1>Loading...</h1>
            </div>
          ) : (
            <>
              <h1 className="mt-3">Recent Posts</h1>
              {posts && renderPosts(posts)}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
