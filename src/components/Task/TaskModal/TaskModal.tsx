import { useState, useRef } from "react";
import type { Task } from "../../../types";
import { useKanban } from "../../../context/KanbanContext";
import { useCommentOperations } from "../../../hooks/useCommentOperations";
import { useTaskOperations } from "../../../hooks/useTaskOperations";
import Modal from "../../Modal/Modal";
import TaskDescription from "../TaskDescription";
import TaskComments from "../TaskComments";
import TaskActions from "../TaskActions";
import "./TaskModal.css";

interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function TaskModal({ task, isOpen, onClose, onDelete }: TaskModalProps) {
  const { updateTaskDescription } = useKanban();
  const { addComment, deleteComment, editComment } = useCommentOperations();
  const { renameTask } = useTaskOperations();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleAddComment = (comment: string) => {
    addComment(task.id, comment);
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(task.id, commentId);
  };

  const handleEditComment = (commentId: string, newText: string) => {
    editComment(task.id, commentId, newText);
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

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEditTitle();
    } else if (e.key === "Escape") {
      handleCancelEditTitle();
    }
  };

  const handleUpdateDescription = (description: string) => {
    updateTaskDescription(task.id, description);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task.title}
      isTitleEditable={!isEditingTitle}
      onTitleEdit={handleStartEditTitle}
      isEditingTitle={isEditingTitle}
      editTitle={editTitle}
      onTitleChange={setEditTitle}
      onTitleKeyDown={handleTitleKeyDown}
      onTitleBlur={handleSaveEditTitle}
    >
      <div className="task-modal-content">
        <TaskDescription description={task.description} onUpdateDescription={handleUpdateDescription} />

        <TaskActions onDelete={onDelete} />

        <TaskComments
          comments={task.comments}
          taskId={task.id}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
          onEditComment={handleEditComment}
        />
      </div>
    </Modal>
  );
}
