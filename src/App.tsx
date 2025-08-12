import "./App.css";
import { useKanban } from "./context/KanbanContext";

function App() {
  const { state, addTask, deleteTask, addColumn, deleteColumn, renameColumn, renameTask } = useKanban();

  return (
    <>
      <h1>Almedia</h1>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {state.columns.map((column) => {
          const columnTasks = state.tasks.filter((task) => task.columnId === column.id);
          console.log(columnTasks);
          return (
            <div
              key={column.id}
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
        })}
        <button
          onClick={() => {
            const title = prompt("Column title?")?.trim();
            if (!title) return;
            const id = `col_${Date.now()}`;
            addColumn(id, title);
          }}
        >
          add column
        </button>
      </div>
    </>
  );
}

export default App;
