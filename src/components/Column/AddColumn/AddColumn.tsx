import { useState } from "react";
import { X } from "lucide-react";

import "./AddColumn.css";

interface AddColumnProps {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
}

export default function AddColumn({ isVisible, onClose, onAdd }: AddColumnProps) {
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
          placeholder="Enter Column name..."
          className="add-column-input"
          autoFocus
          required
        />
        <div className="add-column-actions">
          <button type="submit" className="add-column-btn" disabled={!title.trim()}>
            Add Column
          </button>
          <button type="button" onClick={handleClose} className="add-column-close">
            <X />
          </button>
        </div>
      </form>
    </div>
  );
}
