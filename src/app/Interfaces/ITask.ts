export interface ITask {
  title: string;
  description: string;
  userId: string;
}

export interface ITaskData extends ITask {
  id: string;
  order: number;
  boardId: string;
  columnId: string;
}

export interface IUpdateTask {
  columnId: string;
  taskId: string;
  newData: Omit<ITaskData, 'id'>;
}

export interface IDeleteTask {
  columnId: string;
  taskId: string;
}
