import type { Kanban } from "../types";

const STORAGE_KEY = "kanban-data";

// IMPROVEMENT: can debounce this to prevent too many re-renders
export function saveToStorage(data: Kanban): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
    throw new Error("Failed to save data");
  }
}

export function loadFromStorage(): Kanban | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    return parsed;
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export const getInitialState = (): Kanban => {
  const stored = loadFromStorage();
  if (stored) {
    return stored;
  }

  return {
    columns: [
      { id: "todo", title: "To do" },
      { id: "in_progress", title: "In progress" },
      { id: "done", title: "Done" },
    ],
    tasks: [
      { id: "task1", title: "task one", description: "task one description", comments: [], columnId: "todo", order: 0 },
      {
        id: "task2",
        title: "task two",
        description: "task description",
        comments: [],
        columnId: "in_progress",
        order: 0,
      },
      {
        id: "task3",
        title: "task three",
        description: "task three description",
        comments: [],
        columnId: "finished",
        order: 0,
      },
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
};
