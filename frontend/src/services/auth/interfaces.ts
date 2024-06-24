export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  updatedAt: string;
  createdAt: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
}
