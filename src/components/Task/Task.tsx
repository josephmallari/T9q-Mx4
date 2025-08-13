import { useState } from "react";
import { useKanban } from "../../context/KanbanContext";
import type { Task } from "../../types";
import TaskCard from "./TaskCard";
import TaskModalNew from "./TaskModalNew";

interface TaskProps {
  task: Task;
}

export default function Task({ task }: TaskProps) {
  const { renameTask, deleteTask } = useKanban();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRename = () => {
    const newTitle = prompt("New task title:", task.title)?.trim();
    if (newTitle) {
      renameTask(task.id, newTitle);
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <TaskCard task={task} onClick={() => setIsModalOpen(true)} />
      <TaskModalNew
        task={task}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRename={handleRename}
        onDelete={handleDelete}
      />
    </>
  );
}
