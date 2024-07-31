export interface Tasks {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: {
    _id: string;
    title: string;
    description: string;
    priority: string;
    createdAt: Date;
  }[];
}

export interface TaskReducerIntital {
  loading: boolean;
  error: string | boolean;
  task: Tasks[] | null;
}