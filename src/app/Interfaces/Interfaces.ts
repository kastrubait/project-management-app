export interface IHeaderProps {
  module: string;
  nextModule: boolean;
}
export interface IBodyProps {
  module: string;
  nextModule: boolean;
}

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
export interface IUpdateUserSlice {
  data: IUpdateUser;
}
