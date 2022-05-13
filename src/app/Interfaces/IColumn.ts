export interface IColumn {
  title: string;
  order?: number;
}

export interface IColumnData extends IColumn {
  id: string;
}

export interface IAddColumnSlice {
  data: IColumn;
}
