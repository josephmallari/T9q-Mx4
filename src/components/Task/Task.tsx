import { useState } from "react";
import { useKanban } from "../../context/KanbanContext";
import type { Task } from "../../types";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import "./TaskCard.css";

interface TaskProps {
  task: Task;
  index: number;
}

export default function Task({ task, index }: TaskProps) {
  const { deleteTask, reorderTask } = useKanban();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
      setIsModalOpen(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const draggedTaskId = e.dataTransfer.getData("text/plain");
    if (draggedTaskId && draggedTaskId !== task.id) {
      reorderTask(draggedTaskId, index, task.columnId);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  return (
    <>
      <div
        className={`task-drop-zone ${isDragOver ? "drag-over" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <TaskCard task={task} onClick={() => setIsModalOpen(true)} />
      </div>
      <TaskModal task={task} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={handleDelete} />
    </>
  );
}
