import "./App.css";
import Column from "./components/Column/Column";
import AddColumnModal from "./components/Column/AddColumnModal";
import { useKanban } from "./context/KanbanContext";
import { useState } from "react";

function App() {
  const { state, addColumn } = useKanban();
  const [isAddColumnVisible, setIsAddColumnVisible] = useState(false);

  const handleAddColumn = (title: string) => {
    const id = `col_${Date.now()}`;
    addColumn(id, title);
  };

  return (
    <>
      <h1>Almedia Kanban Board</h1>
      <div className="kanban-board">
        {state.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        {isAddColumnVisible ? (
          <AddColumnModal
            isVisible={isAddColumnVisible}
            onClose={() => setIsAddColumnVisible(false)}
            onAdd={handleAddColumn}
          />
        ) : (
          <button className="add-column-button" onClick={() => setIsAddColumnVisible(true)}>
            Add column
          </button>
        )}
      </div>
    </>
  );
}

export default App;
