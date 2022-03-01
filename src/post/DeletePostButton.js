const DeletePostButton = ({ handleDeletePost }) => {
  return (
    <button onClick={handleDeletePost} className="btn btn-raised btn-danger">
      Delete Post
    </button>
  );
};

export default DeletePostButton;
