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

export interface IMoveTask {
  taskId: string;
  oldColumnId: string;
  newColumnId: string;
  data: ITaskData;
}

export interface IUpdateTask {
  taskId: string;
  data: Omit<ITaskData, 'id'>;
}

export interface IDeleteTask {
  columnId: string;
  taskId: string;
}
