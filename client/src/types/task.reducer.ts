export interface Tasks {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: TaskCard[];
}

export interface TaskCard {
  _id: string;
  title: string;
  description: string;
  priority: string;
  createdAt: Date;
  deadline?: Date;
}

export interface TaskReducerIntital {
  loading: boolean;
  error: string | boolean;
  task: Tasks[] | null;
  status: { _id: string; title: string }[] | null;
}
