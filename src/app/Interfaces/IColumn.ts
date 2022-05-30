import { ITask } from './ITask';

export interface IColumn {
  title: string;
  order?: number;
}

export interface IColumnData extends IColumn {
  id: string;
}

export interface IColumnWithTasks extends IColumnData {
  tasks?: ITask[];
}
