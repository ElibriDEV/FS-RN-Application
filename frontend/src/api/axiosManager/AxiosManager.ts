import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import { IFetchOptions, IAxiosManager, IAxiosResult, AxiosResult } from './interfaces';

class AxiosResultCore<T> implements IAxiosResult<T> {
    status?: number
    data?: T
    isError: boolean = false
    errorMessage?: string
    constructor(props: IAxiosResult<T>) {
        this.status = props.status
        this.data = props.data
        this.isError = props.isError || this.isError
        this.errorMessage = props.errorMessage
    }
}

const BackendBaseURL: string | undefined = process.env.REACT_APP_BACKEND_URL

export class AxiosManager implements IAxiosManager {

    private async _requestExecutor<TResponse>(
        options: AxiosRequestConfig
    ): Promise<AxiosResult<TResponse>> {
        return await axios.request<TResponse>(options)
            .then((response: AxiosResponse<TResponse>) => {
                return new AxiosResultCore<TResponse>({status: response.status, data: response.data})
            })
            .catch((error): AxiosResult<TResponse> => {
                if (axios.isAxiosError(error)) {
                    return new AxiosResultCore<TResponse>({
                        isError: true,
                        status: error.response?.status,
                        errorMessage: error.response?.data.message ? error.response.data.message : error.message,
                    })
                }
                return new AxiosResultCore<TResponse>({isError: true, status: 500, errorMessage: "Internal React error."})
            })
    }

    private _createCookieHeaders(access?: string, refresh?: string): Record<"Cookie", string> {
        const headers: Record<"Cookie", string> = { Cookie: ''};
        if (access !== undefined) headers.Cookie = headers.Cookie.concat(`access_token=${access}; `);
        if (refresh !== undefined) headers.Cookie = headers.Cookie.concat(`refresh_token=${refresh}; `);
        return headers;
    }

    public async backendRequest<TResponse>(options: IFetchOptions): Promise<AxiosResult<TResponse>> {
        const { url, access, refresh, ...ReqOptions } = options;
        const headers: Record<"Cookie", string> = this._createCookieHeaders(access, refresh);
        const result: AxiosResult<TResponse> = await this._requestExecutor<TResponse>(
          {url: `${BackendBaseURL}/${url}`,
              headers: headers,
              ...ReqOptions,
          })
        if (result.status === 401) {
            const refresh_result: AxiosResult<TResponse> = await this._requestExecutor<TResponse>({url: `${BackendBaseURL}/api/auth/refresh`, method: "GET", headers: headers})
            if (refresh_result.status === 401) {
                console.log(options.removeRefresh)
                if (options.removeRefresh !== undefined) {
                    console.log(321)
                    options.removeRefresh("refresh_token");
                }
                if (options.removeAccess !== undefined) options.removeAccess("access_token")
                return refresh_result
            }
            return await this._requestExecutor<TResponse>(
              {url: `${BackendBaseURL}/${url}`,
                  headers: headers,
                  ...ReqOptions,
              })
        } else {
            return result
        }

          // .catch(async (error): Promise<AxiosResult<TResponse>> => {
          //     console.log(1)
          //     if (error.status === 401) {
          //         await this._requestExecutor<TResponse>({url: `${BackendBaseURL}/api/auth/refresh`, method: "GET", headers: headers})
          //           .catch(async (error): Promise<AxiosResult<TResponse>> => {
          //               throw error
          //           })
          //         return await this._requestExecutor<TResponse>({url: `${BackendBaseURL}/${url}`, ...ReqOptions, headers: headers})
          //     } else {
          //         return new AxiosResultCore<TResponse>({isError: true, status: 500, errorMessage: "Internal React error."})
          //     }
          // })
    }
}
