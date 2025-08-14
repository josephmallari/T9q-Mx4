import { useRef } from "react";
import type { Task } from "../../../types";
import "./TaskCard.css";
import { MessageCircle } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const dragRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";

    // visual styles on drag
    if (dragRef.current) {
      dragRef.current.style.opacity = "0.5";
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    // remove visual styles
    if (dragRef.current) {
      dragRef.current.style.opacity = "1";
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // prevent click when dragging
    if ((e.currentTarget as HTMLElement).style.opacity !== "0.5") {
      onClick();
    }
  };

  return (
    <div
      ref={dragRef}
      className="task-card"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      <div className="task-card-title">{task.title}</div>
      {task.description && <div className="task-card-description">{task.description}</div>}
      {task.comments.length > 0 && (
        <div className="task-card-comments">
          <MessageCircle size={16} />
          {task.comments.length} comment{task.comments.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
