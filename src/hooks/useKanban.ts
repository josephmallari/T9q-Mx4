import { useContext } from "react";
import { KanbanContext } from "../context/KanbanContext";

export function useKanban() {
  const context = useContext(KanbanContext);
  if (!context) throw new Error("useKanban must be used within KanbanProvider");
  return context;
}
