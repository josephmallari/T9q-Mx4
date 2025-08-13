import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import "./ColumnRenameModal.css";

interface ColumnRenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTitle: string;
  onRename: (newTitle: string) => void;
}

export default function ColumnRenameModal({ isOpen, onClose, currentTitle, onRename }: ColumnRenameModalProps) {
  const [newTitle, setNewTitle] = useState(currentTitle);

  // Update the input when the modal opens with a new column
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
    <Modal isOpen={isOpen} onClose={handleCancel} title="Rename Column" size="small">
      <form onSubmit={handleSubmit} className="column-rename-form">
        <div className="form-group">
          <label htmlFor="column-title" className="form-label">
            Column Title
          </label>
          <input
            id="column-title"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="form-input"
            placeholder="Enter column title..."
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
