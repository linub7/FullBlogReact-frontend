import { deleteUser } from '../action/user';

const DeleteUser = ({ handleDeleteProfile }) => {
  return (
    <button onClick={handleDeleteProfile} className="btn btn-raised btn-danger">
      Delete Profile
    </button>
  );
};

export default DeleteUser;
