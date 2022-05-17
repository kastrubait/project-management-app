import { ITaskData } from '../../Interfaces/ITask';
import { IColumnData } from '../../Interfaces/IColumn';

type EntityData = IColumnData | ITaskData;

export const compare = (a: number | string, b: number | string, isAsc: boolean): number => {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
};

export const sortByOrder = (cards: EntityData[]): EntityData[] => {
  return cards.sort((a: EntityData, b: EntityData) => {
    const isAsc = true;
    const orderA: number = a.order as number;
    const orderB: number = b.order as number;
    return compare(orderA, orderB, isAsc);
  });
};
