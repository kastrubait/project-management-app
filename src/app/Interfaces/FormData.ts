export enum FormControls {
  title = 'title',
  order = 'order',
  description = 'description',
  userId = 'userId',
}

export type IFormData = {
  [FormControls.title]: string;
  [FormControls.order]?: string;
  [FormControls.description]?: string;
  [FormControls.userId]?: string;
};
