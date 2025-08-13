import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import "./RenameTaskModal.css";

interface RenameTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTitle: string;
  onRename: (newTitle: string) => void;
}

export default function RenameTaskModal({ isOpen, onClose, currentTitle, onRename }: RenameTaskModalProps) {
  const [newTitle, setNewTitle] = useState(currentTitle);

  // Update the input when the modal opens with a new task
  useEffect(() => {
    setNewTitle(currentTitle);
  }, [currentTitle, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = newTitle.trim();
    if (trimmedTitle && trimmedTitle !== currentTitle) {
      onRename(trimmedTitle);
      onClose();
    }
  };

  const handleCancel = () => {
    setNewTitle(currentTitle); // Reset to original title
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Rename Task" size="small">
      <form onSubmit={handleSubmit} className="rename-task-form">
        <div className="form-group">
          <label htmlFor="task-title">Task Title</label>
          <input
            id="task-title"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="form-input"
            placeholder="Enter task title..."
            autoFocus
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button
            type="submit"
            disabled={!newTitle.trim() || newTitle.trim() === currentTitle}
            className="btn btn-primary"
          >
            Rename
          </button>
        </div>
      </form>
    </Modal>
  );
}
