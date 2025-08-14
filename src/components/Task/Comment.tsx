import { useState } from "react";
import type { Comment as CommentType } from "../../types";
import "./Comment.css";

interface CommentProps {
  comment: CommentType;
  taskId: string;
  onDelete: (commentId: string) => void;
  onEdit: (commentId: string, newText: string) => void;
}

export default function Comment({ comment, taskId, onDelete, onEdit }: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.comment);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(comment.id, editText);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      onDelete(comment.id);
    }
  };

  return (
    <div className="comment">
      <div className="comment-content">
        {isEditing ? (
          <div className="comment-edit-form">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="comment-textarea"
              autoFocus
            />
            <div className="comment-edit-actions">
              <button className="btn btn-sm btn-primary" onClick={handleEdit} disabled={!editText.trim()}>
                Save
              </button>
              <button
                className="btn btn-sm btn-outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditText(comment.comment);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="comment-text">{comment.comment}</p>
            <div className="comment-actions">
              <button className="btn btn-sm btn-outline" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className="btn btn-sm btn-danger" onClick={handleDelete}>
                Delete Comment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
