import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Kanban, Task } from "../types";

const initialState: Kanban = {
  columns: [
    { id: "todo", title: "To do" },
    { id: "in_progress", title: "In progress" },
    { id: "finished", title: "Finished" },
  ],
  tasks: [
    { id: "task1", title: "clean", comments: [], columnId: "todo" },
    { id: "Task2", title: "grocery shop", comments: [], columnId: "in_progress" },
    { id: "task3", title: "repair car", comments: [], columnId: "finished" },
    { id: "task4", title: "find clothes", comments: [], columnId: "in_progress" },
  ],
};

type Action =
  | { type: "ADD_TASK"; columnId: string; title: string }
  | { type: "DELETE_TASK"; taskId: string }
  | { type: "ADD_COLUMN"; columnId: string; title: string }
  | { type: "DELETE_COLUMN"; columnId: string }
  | { type: "RENAME_COLUMN"; columnId: string; newTitle: string }
  | { type: "RENAME_TASK"; taskId: string; newTitle: string };

function reducer(state: Kanban, action: Action): Kanban {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask: Task = {
        id: `task_${Date.now()}`,
        title: action.title,
        comments: [],
        columnId: action.columnId,
      };
      return { ...state, tasks: [...state.tasks, newTask] };
    }
    case "DELETE_TASK": {
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.taskId) };
    }
    case "ADD_COLUMN": {
      if (state.columns.some((c) => c.id === action.columnId)) return state;
      return { ...state, columns: [...state.columns, { id: action.columnId, title: action.title }] };
    }
    case "DELETE_COLUMN": {
      return {
        ...state,
        columns: state.columns.filter((column) => column.id !== action.columnId),
        tasks: state.tasks.filter((task) => task.columnId !== action.columnId),
      };
    }
    case "RENAME_COLUMN": {
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.id === action.columnId ? { ...column, title: action.newTitle } : column
        ),
      };
    }
    case "RENAME_TASK": {
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.taskId ? { ...task, title: action.newTitle } : task)),
      };
    }
    default:
      return state;
  }
}

type KanbanContextValue = {
  state: Kanban;
  addTask: (columnId: string, taskTitle: string) => void;
  deleteTask: (taskId: string) => void;
  addColumn: (columnId: string, title: string) => void;
  deleteColumn: (columnId: string) => void;
  renameColumn: (columnId: string, newTitle: string) => void;
  renameTask: (taskId: string, taskTitle: string) => void;
};

const KanbanContext = createContext<KanbanContextValue | undefined>(undefined);

// get column ID, add to task array, append on tasks array

export function KanbanProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addTask(columnId: string, taskTitle: string) {
    dispatch({ type: "ADD_TASK", columnId, title: taskTitle });
  }

  function deleteTask(taskId: string) {
    dispatch({ type: "DELETE_TASK", taskId });
  }

  function addColumn(columnId: string, title: string) {
    dispatch({ type: "ADD_COLUMN", columnId, title });
  }

  function deleteColumn(columnId: string) {
    dispatch({ type: "DELETE_COLUMN", columnId });
  }

  function renameColumn(columnId: string, newTitle: string) {
    dispatch({ type: "RENAME_COLUMN", columnId, newTitle });
  }

  function renameTask(taskId: string, taskTitle: string) {
    dispatch({ type: "RENAME_TASK", taskId, newTitle: taskTitle });
  }

  return (
    <KanbanContext.Provider value={{ state, addTask, deleteTask, addColumn, deleteColumn, renameColumn, renameTask }}>
      {children}
    </KanbanContext.Provider>
  );
}

export function useKanban() {
  const context = useContext(KanbanContext);
  if (!context) throw new Error("useKanban must be used within KanbanProvider");
  return context;
}
