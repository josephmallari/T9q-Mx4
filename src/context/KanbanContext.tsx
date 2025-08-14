import { createContext, useContext, useReducer, type ReactNode, useEffect } from "react";
import { getInitialState, saveToStorage } from "../utils/storage";
import { reducer } from "./reducer";
import { actions } from "./actions";

type KanbanContextValue = {
  state: ReturnType<typeof getInitialState>;
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

export { KanbanContext };

export function KanbanProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  const contextValue: KanbanContextValue = {
    state,
    addTask: (columnId, taskTitle, description) => dispatch(actions.addTask(columnId, taskTitle, description)),
    deleteTask: (taskId) => dispatch(actions.deleteTask(taskId)),
    addColumn: (columnId, title) => dispatch(actions.addColumn(columnId, title)),
    deleteColumn: (columnId) => dispatch(actions.deleteColumn(columnId)),
    renameColumn: (columnId, newTitle) => dispatch(actions.renameColumn(columnId, newTitle)),
    renameTask: (taskId, taskTitle) => dispatch(actions.renameTask(taskId, taskTitle)),
    updateTaskDescription: (taskId, newDescription) => dispatch(actions.updateTaskDescription(taskId, newDescription)),
    addComment: (taskId, comment) => dispatch(actions.addComment(taskId, comment)),
    deleteComment: (taskId, commentId) => dispatch(actions.deleteComment(taskId, commentId)),
    editComment: (taskId, commentId, newText) => dispatch(actions.editComment(taskId, commentId, newText)),
    moveTask: (taskId, newColumnId) => dispatch(actions.moveTask(taskId, newColumnId)),
    reorderTask: (taskId, newOrder, columnId) => dispatch(actions.reorderTask(taskId, newOrder, columnId)),
  };

  return <KanbanContext.Provider value={contextValue}>{children}</KanbanContext.Provider>;
}

export function useKanban() {
  const context = useContext(KanbanContext);
  if (!context) throw new Error("useKanban must be used within KanbanProvider");
  return context;
}
