import { useState } from "react";
import type { Comment } from "../../types";
import CommentsList from "../Comment/CommentsList";
import "./TaskModal/TaskModal.css";

interface TaskCommentsProps {
  comments: Comment[];
  taskId: string;
  onAddComment: (comment: string) => void;
  onDeleteComment: (commentId: string) => void;
  onEditComment: (commentId: string, newText: string) => void;
}

export default function TaskComments({
  comments,
  taskId,
  onAddComment,
  onDeleteComment,
  onEditComment,
}: TaskCommentsProps) {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  const handleCancelComment = () => {
    setNewComment("");
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>

      <div className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="form-control form-control-textarea"
          autoFocus
        />
        <div className="comment-form-actions">
          <button className="btn btn-primary" onClick={handleAddComment} disabled={!newComment.trim()}>
            Add Comment
          </button>
          <button className="btn btn-secondary" onClick={handleCancelComment}>
            Clear
          </button>
        </div>
      </div>

      <CommentsList
        comments={comments}
        taskId={taskId}
        onDeleteComment={onDeleteComment}
        onEditComment={onEditComment}
      />
    </div>
  );
}
