import "./App.css";
import Column from "./components/Column/Column";
import { useKanban } from "./context/KanbanContext";

function App() {
  const { state, addColumn } = useKanban();

  return (
    <>
      <h1>Almedia</h1>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {state.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
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
