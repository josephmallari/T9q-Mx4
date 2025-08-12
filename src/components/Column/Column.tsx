import { useKanban } from "../../context/KanbanContext";
import Task from "../Task/Task";
import type { Column as ColumnType } from "../../types";

interface ColumnProps {
  column: ColumnType;
}

export default function Column({ column }: ColumnProps) {
  const { state, addTask, deleteColumn, renameColumn } = useKanban();

  const columnTasks = state.tasks.filter((task) => task.columnId === column.id);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        minWidth: "200px",
      }}
    >
      <h3>{column.title}</h3>
      <p>Column ID: {column.id}</p>
      {columnTasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={() => addTask(column.id, "task")}>add task</button>
        <button onClick={() => deleteColumn(column.id)}>delete column</button>
        <button
          onClick={() => {
            const newTitle = prompt("New column title:", column.title)?.trim();
            if (newTitle) renameColumn(column.id, newTitle);
          }}
        >
          rename column
        </button>
      </div>
    </div>
  );
}
