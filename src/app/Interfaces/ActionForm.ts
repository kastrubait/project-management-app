import { IFormData } from './FormData';

export type ActionForm = {
  edit: boolean;
  type: string;
  editFields?: IFormData;
};
