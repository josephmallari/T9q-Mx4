import "./TaskModal/TaskModal.css";

interface TaskActionsProps {
  onDelete: () => void;
}

export default function TaskActions({ onDelete }: TaskActionsProps) {
  return (
    <div className="task-modal-actions">
      <button className="btn btn-danger" onClick={onDelete}>
        Delete Task
      </button>
    </div>
  );
}
