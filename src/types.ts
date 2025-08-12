export interface Column {
  id: string;
  title: string;
}

interface Comment {
  comment: string;
}

export interface Task {
  id: string;
  title: string;
  comments: Comment[];
  columnId: string;
}

export interface Kanban {
  columns: Column[];
  tasks: Task[];
}
