export interface IBoard {
  title: string;
  description?: string;
}

export interface IBoardData extends IBoard {
  id: string;
}
