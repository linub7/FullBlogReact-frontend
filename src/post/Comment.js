const Comment = ({
  handleSubmitComment,
  comment,
  handleCommentInputChange,
}) => {
  return (
    <div>
      <h2 className="mt-5 mb-5">Leave a Comment</h2>
      <form onSubmit={handleSubmitComment} className="form-group">
        <input
          placeholder="What's your opinion about this post?!Share with us"
          style={{ width: '70vw' }}
          type="text"
          onChange={handleCommentInputChange}
          value={comment}
          className="form-control"
          required
        />
        <button
          disabled={!comment || comment.length >= 100}
          type="submit"
          className="btn btn-raised btn-warning mt-3"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Comment;
