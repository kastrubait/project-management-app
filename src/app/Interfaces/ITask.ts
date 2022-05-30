export interface IFiles {
  filename: string;
  fileSize: number;
}

export interface ITask {
  title: string;
  description: string;
  userId: string;
  files?: IFiles[];
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

export interface IDownloadFile {
  filename: string;
  taskId: string;
}

export interface UploadFile {
  file: File;
  taskId: string;
}

export interface DeleteTask {
  columnId: string;
  taskId: string;
}
