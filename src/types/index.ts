
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  projectId: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  icon?: string;
}
