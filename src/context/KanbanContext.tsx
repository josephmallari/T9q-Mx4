import { createContext, useContext, useReducer, type ReactNode, useEffect } from "react";
import type { Kanban, Task, Comment } from "../types";

const STORAGE_KEY = "kanban-data";

function saveToStorage(data: Kanban) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("failed to save to local storage");
  }
}

function loadFromStorage(): Kanban | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to loado from local storage");

    return null;
  }
}

function getInitialState(): Kanban {
  const stored = loadFromStorage();
  if (stored) {
    return stored;
  }

  return initialState;
}

const initialState: Kanban = {
  columns: [
    { id: "todo", title: "To do" },
    { id: "in_progress", title: "In progress" },
    { id: "finished", title: "Finished" },
  ],
  tasks: [
    { id: "task1", title: "clean", description: "clean the house", comments: [], columnId: "todo", order: 0 },
    {
      id: "Task2",
      title: "grocery shop",
      description: "buy groceries",
      comments: [],
      columnId: "in_progress",
      order: 0,
    },
    { id: "task3", title: "repair car", description: "repair the car", comments: [], columnId: "finished", order: 0 },
    {
      id: "task4",
      title: "find clothes",
      description: "find clothes",
      comments: [],
      columnId: "in_progress",
      order: 1,
    },
  ],
};

type Action =
  | { type: "ADD_TASK"; columnId: string; title: string; description: string }
  | { type: "DELETE_TASK"; taskId: string }
  | { type: "ADD_COLUMN"; columnId: string; title: string }
  | { type: "DELETE_COLUMN"; columnId: string }
  | { type: "RENAME_COLUMN"; columnId: string; newTitle: string }
  | { type: "RENAME_TASK"; taskId: string; newTitle: string }
  | { type: "UPDATE_TASK_DESCRIPTION"; taskId: string; newDescription: string }
  | { type: "ADD_COMMENT"; taskId: string; comment: string }
  | { type: "DELETE_COMMENT"; taskId: string; commentId: string }
  | { type: "EDIT_COMMENT"; taskId: string; commentId: string; newText: string }
  | { type: "MOVE_TASK"; taskId: string; newColumnId: string }
  | { type: "REORDER_TASK"; taskId: string; newOrder: number; columnId: string };

function reducer(state: Kanban, action: Action): Kanban {
  switch (action.type) {
    case "ADD_TASK": {
      // Get the highest order in the column and add 1
      const columnTasks = state.tasks.filter((task) => task.columnId === action.columnId);
      const maxOrder = columnTasks.length > 0 ? Math.max(...columnTasks.map((task) => task.order)) : -1;

      const newTask: Task = {
        id: `task_${Date.now()}`,
        title: action.title,
        comments: [],
        columnId: action.columnId,
        description: action.description,
        order: maxOrder + 1,
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
    case "UPDATE_TASK_DESCRIPTION": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.taskId ? { ...task, description: action.newDescription } : task
        ),
      };
    }
    case "ADD_COMMENT": {
      const newComment: Comment = {
        id: `comment_${Date.now()}`,
        comment: action.comment,
        createdAt: Date.now(),
      };

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.taskId ? { ...task, comments: [...task.comments, newComment] } : task
        ),
      };
    }
    case "DELETE_COMMENT": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.taskId
            ? { ...task, comments: task.comments.filter((comment) => comment.id !== action.commentId) }
            : task
        ),
      };
    }
    case "EDIT_COMMENT": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.taskId
            ? {
                ...task,
                comments: task.comments.map((comment) =>
                  comment.id === action.commentId ? { ...comment, comment: action.newText } : comment
                ),
              }
            : task
        ),
      };
    }
    case "MOVE_TASK": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.taskId ? { ...task, columnId: action.newColumnId } : task
        ),
      };
    }
    case "REORDER_TASK": {
      const targetTask = state.tasks.find((task) => task.id === action.taskId);
      if (!targetTask) return state;

      // Remove the target task from all columns first
      const tasksWithoutTarget = state.tasks.filter((task) => task.id !== action.taskId);

      // Get all tasks in the target column, sorted by order
      const columnTasks = tasksWithoutTarget
        .filter((task) => task.columnId === action.columnId)
        .sort((a, b) => a.order - b.order);

      // Insert the target task at the new position
      const newOrder = Math.min(action.newOrder, columnTasks.length);
      columnTasks.splice(newOrder, 0, { ...targetTask, columnId: action.columnId });

      // Update all tasks in the column with new orders
      const updatedColumnTasks = columnTasks.map((task, index) => ({
        ...task,
        order: index,
      }));

      // Update the state by replacing all tasks in the column
      const tasksOutsideColumn = tasksWithoutTarget.filter((task) => task.columnId !== action.columnId);
      const updatedTasks = [...tasksOutsideColumn, ...updatedColumnTasks];

      return { ...state, tasks: updatedTasks };
    }
    default:
      return state;
  }
}

type KanbanContextValue = {
  state: Kanban;
  addTask: (columnId: string, taskTitle: string, description: string) => void;
  deleteTask: (taskId: string) => void;
  addColumn: (columnId: string, title: string) => void;
  deleteColumn: (columnId: string) => void;
  renameColumn: (columnId: string, newTitle: string) => void;
  renameTask: (taskId: string, taskTitle: string) => void;
  updateTaskDescription: (taskId: string, newDescription: string) => void;
  addComment: (taskId: string, comment: string) => void;
  deleteComment: (taskId: string, commentId: string) => void;
  editComment: (taskId: string, commentId: string, newText: string) => void;
  moveTask: (taskId: string, newColumnId: string) => void;
  reorderTask: (taskId: string, newOrder: number, columnId: string) => void;
};

const KanbanContext = createContext<KanbanContextValue | undefined>(undefined);

export function KanbanProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  function addTask(columnId: string, taskTitle: string, description: string) {
    dispatch({ type: "ADD_TASK", columnId, title: taskTitle, description: description });
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

  function updateTaskDescription(taskId: string, newDescription: string) {
    dispatch({ type: "UPDATE_TASK_DESCRIPTION", taskId, newDescription });
  }

  function addComment(taskId: string, comment: string) {
    dispatch({ type: "ADD_COMMENT", taskId, comment });
  }

  function deleteComment(taskId: string, commentId: string) {
    dispatch({ type: "DELETE_COMMENT", taskId, commentId });
  }

  function editComment(taskId: string, commentId: string, newText: string) {
    dispatch({ type: "EDIT_COMMENT", taskId, commentId, newText });
  }

  function moveTask(taskId: string, newColumnId: string) {
    dispatch({ type: "MOVE_TASK", taskId, newColumnId });
  }

  function reorderTask(taskId: string, newOrder: number, columnId: string) {
    dispatch({ type: "REORDER_TASK", taskId, newOrder, columnId });
  }

  return (
    <KanbanContext.Provider
      value={{
        state,
        addTask,
        deleteTask,
        addColumn,
        deleteColumn,
        renameColumn,
        renameTask,
        updateTaskDescription,
        moveTask,
        reorderTask,
        addComment,
        deleteComment,
        editComment,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}

export function useKanban() {
  const context = useContext(KanbanContext);
  if (!context) throw new Error("useKanban must be used within KanbanProvider");
  return context;
}
