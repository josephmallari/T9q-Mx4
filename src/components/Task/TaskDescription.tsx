import { useState, useRef } from "react";
import "./TaskModal/TaskModal.css";

interface TaskDescriptionProps {
  description: string;
  onUpdateDescription: (description: string) => void;
}

export default function TaskDescription({ description, onUpdateDescription }: TaskDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(description);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditDescription(description);

    // can use ref here or useEffect to focus and select
    setTimeout(() => {
      descriptionInputRef.current?.focus();
      descriptionInputRef.current?.select();
    }, 0);
  };

  const handleSave = () => {
    onUpdateDescription(editDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditDescription(description);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className="task-description-section">
      <h3>Description</h3>
      {isEditing ? (
        <div className="task-description-edit">
          <textarea
            ref={descriptionInputRef}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            className="form-control form-control-textarea"
            placeholder="Add a description..."
            rows={4}
          />
          <div className="task-description-actions">
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="task-description-display">
          <p className="task-description">{description || "No description"}</p>
          <button className="btn btn-secondary edit-description-btn" onClick={handleStartEdit}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
