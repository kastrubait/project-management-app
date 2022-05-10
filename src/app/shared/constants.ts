import { IBindingData, IFormData } from '../Interfaces/FormData';

export const ACTION = {
  CREATE: (type: string, data: IBindingData) => {
    return {
      edit: false,
      type: type,
      bindingFields: { ...data },
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
