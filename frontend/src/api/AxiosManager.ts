import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

export interface FetchOptions {
    method: Method
    url: string
    params?: Record<string, string | number>
    body?: BodyInit | null
}

export interface IAxiosResult<T> {
    status?: number
    data?: T
    isError?: boolean
    errorMessage?: string
}

export class AxiosResult<T> implements IAxiosResult<any>{
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

export interface IAxiosManager {
    backendRequest: <T>(options: FetchOptions) => Promise<AxiosResult<T>>
}

const BackendBaseURL: string | undefined = process.env.REACT_APP_BACKEND_URL

export class AxiosManager implements IAxiosManager {

    private async _requestExecutor<TResponse>(
        options: AxiosRequestConfig<TResponse>
    ): Promise<AxiosResult<TResponse>> {
        return await axios.request<TResponse>(options)
            .then((response: AxiosResponse<TResponse>) => {
                return new AxiosResult<TResponse>({status: response.status, data: response.data})
            })
            .catch((error): AxiosResult<TResponse> => {
                if (axios.isAxiosError(error)) {
                    return new AxiosResult<TResponse>({status: error.response?.status, errorMessage: error.message})
                }
                return new AxiosResult<TResponse>({status: 500, errorMessage: "Internal React error."})
            })
    }

    public async backendRequest<TResponse>(options: FetchOptions): Promise<AxiosResult<TResponse>> {
        const { url, ...ReqOptions } = options
        return await this._requestExecutor<TResponse>({url: `${BackendBaseURL}/${url}`, ...ReqOptions})
    }
}
