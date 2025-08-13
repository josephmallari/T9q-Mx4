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
    </Modal>
  );
}
