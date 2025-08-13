import { useState } from "react";
import Modal from "../Modal/Modal";
import "./AddColumnModal.css";

interface AddColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
}

export default function AddColumnModal({ isOpen, onClose, onAdd }: AddColumnModalProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Column" size="small">
      <form onSubmit={handleSubmit} className="add-column-form">
        <div className="form-group">
          <label htmlFor="column-title">Column Title</label>
          <input
            id="column-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter column title..."
            className="form-input"
            autoFocus
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={!title.trim()}>
            Add Column
          </button>
        </div>
      </form>
    </Modal>
  );
}
