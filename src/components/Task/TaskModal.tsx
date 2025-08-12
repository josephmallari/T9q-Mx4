import { useState } from "react";
import type { Task } from "../../types";
import { useKanban } from "../../context/KanbanContext";
import CommentsList from "./CommentsList";
import "./TaskModal.css";

interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export default function TaskModal({ task, isOpen, onClose, onRename, onDelete }: TaskModalProps) {
  const { addComment, deleteComment, editComment } = useKanban();
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(task.id, newComment);
      setNewComment("");
    }
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(task.id, commentId);
  };

  const handleEditComment = (commentId: string, newText: string) => {
    editComment(task.id, commentId, newText);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{task.title}</h2>
          <button className="modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onRename}>
            Rename Task
          </button>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete Task
          </button>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <h3>Comments</h3>

          {/* Add Comment Form */}
          <div className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="comment-textarea"
            />
            <div className="comment-form-actions">
              <button className="btn btn-primary" onClick={handleAddComment} disabled={!newComment.trim()}>
                Add Comment
              </button>
            </div>
          </div>

          {/* Comments List */}
          <CommentsList
            comments={task.comments}
            taskId={task.id}
            onDeleteComment={handleDeleteComment}
            onEditComment={handleEditComment}
          />
        </div>
      </div>
    </div>
  );
}
