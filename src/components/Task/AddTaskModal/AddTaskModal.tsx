import { useState } from "react";
import Modal from "../../Modal/Modal";
import "./AddTaskModal.css";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string) => void;
}

export default function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), description.trim());
      setTitle("");
      setDescription("");
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    // add markup inside Modal for better reusability, it will then be passed as children
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Task">
      {/* keeping form validation simple here with required and only for Task */}
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="form-group">
          <label htmlFor="task-title">Task</label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description..."
            className="form-control form-control-textarea"
            rows={3}
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={!title.trim()}>
            Add Task
          </button>
        </div>
      </form>
    </Modal>
  );
}
