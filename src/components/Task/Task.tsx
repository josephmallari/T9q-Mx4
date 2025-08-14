import { useState } from "react";
import { useKanban } from "../../context/KanbanContext";
import { useTaskOperations } from "../../hooks/useTaskOperations";
import type { Task } from "../../types";
import TaskCard from "./TaskCard/TaskCard";
import TaskModal from "./TaskModal/TaskModal";
import "./TaskCard/TaskCard.css";

interface TaskProps {
  task: Task;
  index: number;
}

export default function Task({ task, index }: TaskProps) {
  const { reorderTask } = useKanban();
  const { deleteTask } = useTaskOperations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDelete = () => {
    deleteTask(task.id, task.title);
    setIsModalOpen(false);
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
