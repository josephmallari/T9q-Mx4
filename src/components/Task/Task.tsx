import { useKanban } from "../../context/KanbanContext";
import type { Task } from "../../types";

interface TaskProps {
  task: Task;
}
export default function Task({ task }: TaskProps) {
  const { renameTask, deleteTask } = useKanban();
  return (
    <div key={task.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <div>{task.title}</div>
      <button
        onClick={() => {
          const newTitle = prompt("New task title:", task.title)?.trim();
          if (newTitle) renameTask(task.id, newTitle);
        }}
      >
        rename task
      </button>
      <button onClick={() => deleteTask(task.id)}>delete task</button>
    </div>
  );
}
