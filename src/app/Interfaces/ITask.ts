export interface ITask {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files?: IFiles[];
}

export interface ITaskData extends ITask {
  id: string;
}

export interface IFiles {
  filename: string;
  fileSize: number;
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
