export enum FormControls {
  title = 'title',
  order = 'order',
  description = 'description',
  userId = 'userId',
}

export type IFormData = {
  title: string;
  order?: number;
  description?: string;
  userId?: string;
};

export type IBindingData = {
  boardId?: string;
  columnId?: string;
  userId?: string;
};
