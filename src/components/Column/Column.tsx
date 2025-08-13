import { useRef, useState } from "react";
import { useKanban } from "../../context/KanbanContext";
import Task from "../Task/Task";
import ColumnRenameModal from "./ColumnRenameModal";
import AddTaskModal from "../Task/AddTaskModal";
import type { Column as ColumnType } from "../../types";
import "./Column.css";

interface ColumnProps {
  column: ColumnType;
}

export default function Column({ column }: ColumnProps) {
  const { state, addTask, deleteColumn, renameColumn, moveTask } = useKanban();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
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

  const handleAddTask = (title: string, description: string) => {
    addTask(column.id, title, description);
  };

  return (
    <div
      ref={dropRef}
      className={`column ${isDragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <h3 className="column-title">{column.title}</h3>
        <div className="column-actions">
          <button className="column-action-button" onClick={() => setIsRenameModalOpen(true)}>
            rename
          </button>
          <button className="column-action-button" onClick={() => deleteColumn(column.id)}>
            delete
          </button>
        </div>
      </div>

      <div className="column-content">
        {columnTasks.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
      </div>

      <div className="column-footer">
        <button className="add-task-button" onClick={() => setIsAddTaskModalOpen(true)}>
          <span className="add-task-icon">+</span>
          Add another card
        </button>
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

      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} onAdd={handleAddTask} />
    </div>
  );
}
