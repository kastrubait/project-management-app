import { ITaskData } from '../../Interfaces/ITask';

export const filterTask = (tasks: ITaskData[], id: string) => {
  const filterArray = tasks.filter((task) => task.columnId === id);
  return filterArray;
};
