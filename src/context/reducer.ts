import type { Kanban, Task, Comment } from "../types";
import type { Action } from "./actions";

// optional, create smaller reducers for each action type
export function reducer(state: Kanban, action: Action): Kanban {
  switch (action.type) {
    case "ADD_TASK": {
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
      // find task being moved by its ID
      const targetTask = state.tasks.find((task) => task.id === action.taskId);
      if (!targetTask) return state; // Exit if task not found

      // remove the target task from the original position
      const tasksWithoutTarget = state.tasks.filter((task) => task.id !== action.taskId);

      // get all tasks in the target column (excluding the moved task) and sort by current order
      const columnTasks = tasksWithoutTarget
        .filter((task) => task.columnId === action.columnId)
        .sort((a, b) => a.order - b.order);

      // ensure the new order doesn't exceed the column's task count
      const newOrder = Math.min(action.newOrder, columnTasks.length);

      // insert the target task at the new position in the column
      columnTasks.splice(newOrder, 0, { ...targetTask, columnId: action.columnId });

      // recalculate order numbers for all tasks in the column (0, 1, 2, etc.)
      const updatedColumnTasks = columnTasks.map((task, index) => ({
        ...task,
        order: index,
      }));

      // get all tasks that are NOT in the target column (preserve their original state)
      const tasksOutsideColumn = tasksWithoutTarget.filter((task) => task.columnId !== action.columnId);

      // combine tasks outside the column with the updated column tasks
      const updatedTasks = [...tasksOutsideColumn, ...updatedColumnTasks];

      // return new state with updated task array
      return { ...state, tasks: updatedTasks };
    }
    default:
      return state;
  }
}
