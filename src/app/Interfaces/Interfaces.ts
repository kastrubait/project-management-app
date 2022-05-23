export interface IFormProps {
  name: string;
  login: string;
  password: string;
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
  arg0: string;
  arg1: string;
  arg2: string;
}
export interface ITask {
  boardId: string;
  columnId: string;
  description: string;
  id: string;
  order: number | null;
  title: string;
  userId: string;
}
