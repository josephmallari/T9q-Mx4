import { useRef, useState } from "react";
import { useKanban } from "../../context/KanbanContext";
import Task from "../Task/Task";
import ColumnRenameModal from "./ColumnRenameModal";
import type { Column as ColumnType } from "../../types";

interface ColumnProps {
  column: ColumnType;
}

export default function Column({ column }: ColumnProps) {
  const { state, addTask, deleteColumn, renameColumn, moveTask } = useKanban();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const columnTasks = state.tasks.filter((task) => task.columnId === column.id);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only set drag over to false if we're leaving the column entirely
    if (!dropRef.current?.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      moveTask(taskId, column.id);
    }
  };

  return (
    <div
      ref={dropRef}
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        minWidth: "200px",
        backgroundColor: isDragOver ? "#f0f8ff" : "white",
        borderColor: isDragOver ? "#0066cc" : "#ccc",
        transition: "all 0.2s ease",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h3>{column.title}</h3>
      <p>Column ID: {column.id}</p>
      {columnTasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={() => addTask(column.id, "task")}>add task</button>
        <button onClick={() => deleteColumn(column.id)}>delete column</button>
        <button onClick={() => setIsRenameModalOpen(true)}>rename column</button>
      </div>

      <ColumnRenameModal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        currentTitle={column.title}
        onRename={(newTitle) => {
          renameColumn(column.id, newTitle);
          setIsRenameModalOpen(false);
        }}
      />
    </div>
  );
}
