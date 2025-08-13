import { useState } from "react";
import { useKanban } from "../../context/KanbanContext";
import type { Task } from "../../types";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

interface TaskProps {
  task: Task;
}

export default function Task({ task }: TaskProps) {
  const { deleteTask } = useKanban();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <TaskCard task={task} onClick={() => setIsModalOpen(true)} />
      <TaskModal task={task} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={handleDelete} />
    </>
  );
}
