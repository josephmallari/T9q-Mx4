import { useState } from "react";
import type { Task } from "../../types";
import { useKanban } from "../../context/KanbanContext";
import Modal from "../Modal/Modal";
import CommentsList from "./CommentsList";
import "./TaskModalNew.css";

interface TaskModalNewProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export default function TaskModalNew({ task, isOpen, onClose, onRename, onDelete }: TaskModalNewProps) {
  const { addComment, deleteComment, editComment } = useKanban();
  const [newComment, setNewComment] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(task.id, newComment);
      setNewComment("");
      setShowCommentForm(false);
    }
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(task.id, commentId);
  };

  const handleEditComment = (commentId: string, newText: string) => {
    editComment(task.id, commentId, newText);
  };

  const handleCancelComment = () => {
    setNewComment("");
    setShowCommentForm(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task.title} size="large">
      <div className="task-modal-content">
        <div className="task-modal-actions">
          <button className="btn btn-primary" onClick={onRename}>
            Rename Task
          </button>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete Task
          </button>
        </div>

        {/* Task Description */}
        {task.description && (
          <div className="task-description-section">
            <h3>Description</h3>
            <p className="task-description">{task.description}</p>
          </div>
        )}

        {/* Comments Section */}
        <div className="comments-section">
          <h3>Comments</h3>

          {/* Add Comment Button/Form */}
          {!showCommentForm ? (
            <button className="btn btn-secondary add-comment-button" onClick={() => setShowCommentForm(true)}>
              Add comment
            </button>
          ) : (
            <div className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="comment-textarea"
                autoFocus
              />
              <div className="comment-form-actions">
                <button className="btn btn-primary" onClick={handleAddComment} disabled={!newComment.trim()}>
                  Add Comment
                </button>
                <button className="btn btn-secondary" onClick={handleCancelComment}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Comments List */}
          <CommentsList
            comments={task.comments}
            taskId={task.id}
            onDeleteComment={handleDeleteComment}
            onEditComment={handleEditComment}
          />
        </div>
      </div>
    </Modal>
  );
}
