export interface IHeaderProps {
  module: string;
  nextModule: boolean;
}
export interface IBodyProps {
  module: string;
  nextModule: boolean;
}

export interface IFormProps {
  arg0: string;
  arg1: string;
  arg2: string | number;
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
  data: IFormData;
}

export interface IFormData {
  arg0: string;
  arg1: string;
  arg2: string | number;
}
