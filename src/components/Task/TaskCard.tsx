import type { Task } from "../../types";
import "./TaskCard.css";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <div className="task-card" onClick={onClick}>
      {task.title}
    </div>
  );
}
