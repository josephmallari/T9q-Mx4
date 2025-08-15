import "./App.css";
import Column from "./components/Column/Column/Column";
import AddColumn from "./components/Column/AddColumn/AddColumn";
import { useKanban } from "./context/KanbanContext";
import { useColumnOperations } from "./hooks/useColumnOperations";
import { useState } from "react";

function App() {
  const { state } = useKanban();
  const { addColumn } = useColumnOperations();
  const [isAddColumnVisible, setIsAddColumnVisible] = useState(false);

  const handleAddColumn = (title: string) => {
    addColumn(title);
  };

  return (
    <>
      <h1>Almedia Kanban Board</h1>
      <div className="kanban-board">
        {state.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        {isAddColumnVisible ? (
          <AddColumn
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
