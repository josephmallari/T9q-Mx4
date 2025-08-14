export interface Column {
  id: string;
  title: string;
}

export interface Comment {
  id: string;
  comment: string;
  createdAt: number; // Timestamp for sorting
}

export interface Task {
  id: string;
  title: string;
  comments: Comment[];
  columnId: string;
  description: string;
  order: number;
}

export interface Kanban {
  columns: Column[];
  tasks: Task[];
}
