import { useState, useRef } from "react";
import type { Task } from "../../types";
import { useKanban } from "../../context/KanbanContext";
import Modal from "../Modal/Modal";
import CommentsList from "./CommentsList";
import "./TaskModalNew.css";

interface TaskModalNewProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function TaskModalNew({ task, isOpen, onClose, onDelete }: TaskModalNewProps) {
  const { addComment, deleteComment, editComment, renameTask, updateTaskDescription } = useKanban();
  const [newComment, setNewComment] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

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

  const handleStartEditTitle = () => {
    setIsEditingTitle(true);
    setEditTitle(task.title);
    setTimeout(() => {
      titleInputRef.current?.focus();
      titleInputRef.current?.select();
    }, 0);
  };

  const handleSaveEditTitle = () => {
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle) {
      renameTask(task.id, trimmedTitle);
    }
    setIsEditingTitle(false);
  };

  const handleCancelEditTitle = () => {
    setEditTitle(task.title);
    setIsEditingTitle(false);
  };

  const handleStartEditDescription = () => {
    setIsEditingDescription(true);
    setEditDescription(task.description);
    setTimeout(() => {
      descriptionInputRef.current?.focus();
      descriptionInputRef.current?.select();
    }, 0);
  };

  const handleSaveEditDescription = () => {
    updateTaskDescription(task.id, editDescription);
    setIsEditingDescription(false);
  };

  const handleCancelEditDescription = () => {
    setEditDescription(task.description);
    setIsEditingDescription(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEditTitle();
    } else if (e.key === "Escape") {
      handleCancelEditTitle();
    }
  };

  const handleDescriptionKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSaveEditDescription();
    } else if (e.key === "Escape") {
      handleCancelEditDescription();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task.title}
      size="large"
      isTitleEditable={!isEditingTitle}
      onTitleEdit={handleStartEditTitle}
      isEditingTitle={isEditingTitle}
      editTitle={editTitle}
      onTitleChange={setEditTitle}
      onTitleKeyDown={handleTitleKeyDown}
      onTitleBlur={handleSaveEditTitle}
    >
      <div className="task-modal-content">
        {/* Task Description */}
        <div className="task-description-section">
          <h3>Description</h3>
          {isEditingDescription ? (
            <div className="task-description-edit">
              <textarea
                ref={descriptionInputRef}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyDown={handleDescriptionKeyDown}
                className="task-description-input"
                placeholder="Add a description..."
                rows={4}
              />
              <div className="task-description-actions">
                <button className="btn btn-primary" onClick={handleSaveEditDescription}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancelEditDescription}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="task-description-display">
              <p className="task-description">{task.description || "No description"}</p>
              <button className="btn btn-secondary edit-description-btn" onClick={handleStartEditDescription}>
                Edit
              </button>
            </div>
          )}
        </div>
        <div className="task-modal-actions">
          <button className="btn btn-danger" onClick={onDelete}>
            Delete Task
          </button>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <h3>Comments</h3>

          {/* Add Comment Button/Form */}

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
                Clear
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
