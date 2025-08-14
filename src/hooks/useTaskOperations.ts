import { useCallback } from "react";
import { useKanban } from "../context/KanbanContext";

export function useTaskOperations() {
  const { addTask, deleteTask, renameTask, updateTaskDescription } = useKanban();

  const handleAddTask = useCallback(
    (columnId: string, title: string, description: string) => {
      const trimmedTitle = title.trim();
      const trimmedDescription = description.trim();
      if (trimmedTitle) {
        addTask(columnId, trimmedTitle, trimmedDescription);
      }
    },
    [addTask]
  );

  const handleDeleteTask = useCallback(
    (taskId: string, taskTitle: string) => {
      if (window.confirm(`Are you sure you want to delete "${taskTitle}"?`)) {
        deleteTask(taskId);
      }
    },
    [deleteTask]
  );

  const handleRenameTask = useCallback(
    (taskId: string, newTitle: string) => {
      const trimmedTitle = newTitle.trim();
      if (trimmedTitle) {
        renameTask(taskId, trimmedTitle);
      }
    },
    [renameTask]
  );

  return {
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
    renameTask: handleRenameTask,
    updateTaskDescription,
  };
}
