import type { Task } from "../../types";
import "./TaskModal.css";

interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export default function TaskModal({ task, isOpen, onClose, onRename, onDelete }: TaskModalProps) {
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
      </div>
    </div>
  );
}
