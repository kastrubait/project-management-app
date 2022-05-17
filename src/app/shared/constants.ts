import { Theme } from 'react-toastify';
import { IBindingData, IFormData } from '../Interfaces/FormData';

export const ACTION = {
  CREATE: (type: string, ids: IBindingData) => {
    return {
      edit: false,
      type: type,
      bindingFields: { ...ids },
    };
  },
  EDIT: (type: string, data: IFormData, ids: IBindingData) => {
    return {
      edit: true,
      type: type,
      editFields: { ...data },
      bindingFields: { ...ids },
    };
  },
};

export const WARING = 'Warning';
export const BOARD = 'board';
export const COLUMN = 'column';
export const TASK = 'task';
export const TOAST_POSITION = 'bottom-right';
export const TOAST_THEME = 'colored';
export const LOADING_TRUE = 'loading';
