import { useMemo, useRef, useState } from "react";
import { useKanban } from "../../../context/KanbanContext";
import { useColumnOperations } from "../../../hooks/useColumnOperations";
import { useTaskOperations } from "../../../hooks/useTaskOperations";
import AddTaskModal from "../../Task/AddTaskModal/AddTaskModal";
import type { Column as ColumnType } from "../../../types";
import { Plus } from "lucide-react";
import Task from "../../Task/Task";
import "./Column.css";

interface ColumnProps {
  column: ColumnType;
}

export default function Column({ column }: ColumnProps) {
  const { state, moveTask } = useKanban();
  const { deleteColumn, renameColumn } = useColumnOperations();
  const { addTask } = useTaskOperations();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(column.title);
  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const columnTasks = useMemo(
    () => state.tasks.filter((task) => task.columnId === column.id).sort((a, b) => a.order - b.order),
    [state.tasks, column.id]
  );

  // drag and drop logic
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // set drag over to false if we're leaving the column entirely
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

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditTitle(column.title);
    // handles input focus and selection, can also use Ref or useEffect instead
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const handleSaveEdit = () => {
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle) {
      renameColumn(column.id, trimmedTitle);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(column.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const handleDeleteColumn = () => {
    deleteColumn(column.id, column.title);
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
        {isEditing ? (
          <div className="column-title-edit">
            <input
              ref={inputRef}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSaveEdit}
              className="form-control"
              maxLength={50}
            />
          </div>
        ) : (
          <h2 className="column-title" onClick={handleStartEdit}>
            {column.title}
          </h2>
        )}
        <div className="column-actions">
          <button className="column-action-button" onClick={handleDeleteColumn}>
            Delete
          </button>
        </div>
      </div>

      <div className="column-content">
        {columnTasks.map((task, index) => {
          return <Task key={task.id} task={task} index={index} />;
        })}
      </div>

      <div className="column-footer">
        <button className="add-task-button" onClick={() => setIsAddTaskModalOpen(true)}>
          <Plus size={16} />
          Add Task
        </button>
      </div>

      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} onAdd={handleAddTask} />
    </div>
  );
}
