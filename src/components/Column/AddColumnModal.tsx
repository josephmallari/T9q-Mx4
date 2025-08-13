import { useState } from "react";
import "./AddColumnModal.css";

interface AddColumnModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
}

export default function AddColumnModal({ isVisible, onClose, onAdd }: AddColumnModalProps) {
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

  if (!isVisible) {
    return null;
  }

  return (
    <div className="add-column-inline">
      <form onSubmit={handleSubmit} className="add-column-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter list name..."
          className="add-column-input"
          autoFocus
          required
        />
        <div className="add-column-actions">
          <button type="submit" className="add-column-btn" disabled={!title.trim()}>
            Add list
          </button>
          <button type="button" onClick={handleClose} className="add-column-close">
            ✕
          </button>
        </div>
      </form>
    </div>
  );
}
