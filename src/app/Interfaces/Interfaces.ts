export interface IFormProps {
  name: string;
  login: string;
  password: string;
}

export interface IUser {
  name: string;
  login: string;
  id: string;
}

export interface IUpdateUser {
  name: string;
  login: string;
  password: string;
}
export interface IAuthUser {
  login: string;
  password: string;
}
export interface IUpdateUserSlice {
  data: IFormProps;
}
export interface IUpdateProfile {
  dataForm: IFormData;
}

export interface IFormData {
  name: string;
  login: string;
  password: string;
}

export interface DeleteTask {
  columnId: string;
  taskId: string;
}
