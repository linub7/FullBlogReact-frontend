import { Link } from 'react-router-dom';
import DefaultImage from '../images/avatar.png';

const ProfileTabs = ({ following, followers }) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-primary">Followers</h3>
          <hr />
          {followers &&
            followers.length !== 0 &&
            followers.map((follower) => (
              <div key={follower._id}>
                <div className="row">
                  <div>
                    <Link to={`/user/${follower._id}`}>
                      <div className="form-inline mb-2">
                        <img
                          className="float-left mr-2"
                          style={{
                            borderRadius: '50%',
                            border: '1px solid black',
                          }}
                          height="50em"
                          width="50em"
                          src={`${process.env.REACT_APP_API}/user/image/${follower._id}`}
                          onError={(i) => (i.target.src = `${DefaultImage}`)}
                          alt={follower.name}
                        />
                        <div>
                          <p className="lead">{follower.name}</p>
                        </div>
                      </div>
                    </Link>
                    <hr />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="col-md-6">
          <h3 className="text-primary">Following</h3>
          <hr />
          {following &&
            following.length !== 0 &&
            following.map((follow) => (
              <div key={follow._id}>
                <div className="row">
                  <div>
                    <Link to={`/user/${follow._id}`}>
                      <div className="form-inline mb-2">
                        <img
                          className="float-left mr-2"
                          style={{
                            borderRadius: '50%',
                            border: '1px solid black',
                          }}
                          height="50em"
                          width="50em"
                          src={`${process.env.REACT_APP_API}/user/image/${follow._id}`}
                          onError={(i) => (i.target.src = `${DefaultImage}`)}
                          alt={follow.name}
                        />
                        <div>
                          <p className="lead">{follow.name}</p>
                        </div>
                      </div>
                    </Link>
                    <hr />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;
