export type Action =
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

// action creators for better type safety
export const actions = {
  addTask: (columnId: string, title: string, description: string): Action => ({
    type: "ADD_TASK",
    columnId,
    title,
    description,
  }),
  deleteTask: (taskId: string): Action => ({
    type: "DELETE_TASK",
    taskId,
  }),
  addColumn: (columnId: string, title: string): Action => ({
    type: "ADD_COLUMN",
    columnId,
    title,
  }),
  deleteColumn: (columnId: string): Action => ({
    type: "DELETE_COLUMN",
    columnId,
  }),
  renameColumn: (columnId: string, newTitle: string): Action => ({
    type: "RENAME_COLUMN",
    columnId,
    newTitle,
  }),
  renameTask: (taskId: string, newTitle: string): Action => ({
    type: "RENAME_TASK",
    taskId,
    newTitle,
  }),
  updateTaskDescription: (taskId: string, newDescription: string): Action => ({
    type: "UPDATE_TASK_DESCRIPTION",
    taskId,
    newDescription,
  }),
  addComment: (taskId: string, comment: string): Action => ({
    type: "ADD_COMMENT",
    taskId,
    comment,
  }),
  deleteComment: (taskId: string, commentId: string): Action => ({
    type: "DELETE_COMMENT",
    taskId,
    commentId,
  }),
  editComment: (taskId: string, commentId: string, newText: string): Action => ({
    type: "EDIT_COMMENT",
    taskId,
    commentId,
    newText,
  }),
  moveTask: (taskId: string, newColumnId: string): Action => ({
    type: "MOVE_TASK",
    taskId,
    newColumnId,
  }),
  reorderTask: (taskId: string, newOrder: number, columnId: string): Action => ({
    type: "REORDER_TASK",
    taskId,
    newOrder,
    columnId,
  }),
};
