import { IFormData } from '../Interfaces/FormData';

export const ACTION = {
  CREATE: (type: string) => {
    return {
      edit: false,
      type: type,
    };
  },
  EDIT: (type: string, data: IFormData) => {
    return {
      edit: true,
      type: type,
      editFields: { ...data },
    };
  },
};
