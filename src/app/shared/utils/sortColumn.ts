import { IColumnData } from '../../Interfaces/IColumn';

export const compare = (a: number | string, b: number | string, isAsc: boolean): number => {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
};

export const sortColumn = (cards: IColumnData[]): IColumnData[] => {
  return cards.sort((a: IColumnData, b: IColumnData) => {
    const isAsc = true;
    const orderA: number = a.order as number;
    const orderB: number = b.order as number;
    return compare(orderA, orderB, isAsc);
  });
};
