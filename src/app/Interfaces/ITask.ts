export interface ITask {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface ITaskData extends ITask {
  id: string;
}
