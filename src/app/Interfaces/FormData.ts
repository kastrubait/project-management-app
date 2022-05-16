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

export interface IFormDataNew extends IFormData {
  data: IFormData;
  ids: IBindingData;
}
