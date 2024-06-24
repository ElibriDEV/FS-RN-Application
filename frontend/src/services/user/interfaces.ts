import { IWithCookieCredentials } from '../interfaces';

export interface IGetSelfRequest extends IWithCookieCredentials {}

export interface IGetSelfResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateSelfRequest extends IWithCookieCredentials {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface IUpdateSelfResponse extends IGetSelfResponse {}

export interface IDeleteSelfRequest extends IWithCookieCredentials {}

export interface IDeleteSelfResponse {
  message: string;
}
