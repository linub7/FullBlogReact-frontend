import { followUser, unFollowUser } from '../action/user';

const FollowProfileButton = ({ following, onButtonClick }) => {
  const followClick = () => {
    onButtonClick(followUser);
  };

  const unFollowClick = () => {
    onButtonClick(unFollowUser);
  };
  return (
    <div className="d-inline-block">
      {following ? (
        <button onClick={unFollowClick} className="btn btn-warning btn-raised">
          UnFollow
        </button>
      ) : (
        <button
          onClick={followClick}
          className="btn btn-success btn-raised mr-5"
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowProfileButton;
