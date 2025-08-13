import "./App.css";
import Column from "./components/Column/Column";
import AddColumnModal from "./components/Column/AddColumnModal";
import { useKanban } from "./context/KanbanContext";
import { useState } from "react";

function App() {
  const { state, addColumn } = useKanban();
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);

  const handleAddColumn = (title: string) => {
    const id = `col_${Date.now()}`;
    addColumn(id, title);
  };

  return (
    <>
      <h1>Almedia</h1>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {state.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        <button onClick={() => setIsAddColumnModalOpen(true)}>add column</button>
      </div>

      <AddColumnModal
        isOpen={isAddColumnModalOpen}
        onClose={() => setIsAddColumnModalOpen(false)}
        onAdd={handleAddColumn}
      />
    </>
  );
}

export default App;
