import { AxiosRequestConfig } from 'axios';

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export interface IFetchOptions extends Omit<AxiosRequestConfig, 'headers' | 'method'> {
  method: Method,
  access?: string,
  refresh?: string,
  removeAccess?: Function,
  removeRefresh?: Function,
}

export interface IAxiosResult<T> {
  status?: number,
  data?: T,
  isError?: boolean,
  errorMessage?: string,
}

export interface IAxiosManager {
  backendRequest: <T>(options: IFetchOptions) => Promise<AxiosResult<T>>,
}

export interface AxiosResult<T> {
  status?: number,
  data?: T,
  isError: boolean,
  errorMessage?: string,
}
