export interface TodoData {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
}

export interface TodoDetails {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  onClose: () => void;
}

export type TodoEditData = Pick<TodoDetails, 'title' | 'content' | 'onClose'>;
