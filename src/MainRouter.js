import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import cookie from 'js-cookie';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import FindPeople from './user/FindPeople';
import CreatePost from './post/CreatePost';
import Posts from './post/Posts';
import SinglePost from './post/SinglePost';
import EditPost from './post/EditPost';
import ForgotPassword from './user/ForgotPassword';
import ResetPassword from './user/ResetPassword';

const MainRouter = () => {
  const token = cookie.get('token');
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/signin"
          element={token ? <Navigate to="/" /> : <Signin />}
        />
        <Route
          path="/forgot-password"
          element={token ? <Navigate to="/" /> : <ForgotPassword />}
        />
        <Route
          path="/reset-password/:resetPasswordToken"
          element={token ? <Navigate to="/" /> : <ResetPassword />}
        />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/user/edit/:id" element={<EditProfile />} />
        <Route path="/findpeople" element={<FindPeople />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/post/edit/:id" element={<EditPost />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
