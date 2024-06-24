import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from './interfaces';
import { AbstractService } from '../../api/axiosManager/abstractService';
import { AxiosResult } from '../../api/axiosManager/interfaces';

export class AuthService extends AbstractService {

  public async register(args: IRegisterRequest): Promise<AxiosResult<IRegisterResponse>> {
    return await this.manager.backendRequest<IRegisterResponse>({
      url: 'api/auth/register',
      method: 'POST',
      data: args,
    })
  }

  public async login(args: ILoginRequest): Promise<AxiosResult<ILoginResponse>> {
    return await this.manager.backendRequest<ILoginResponse>({
      url: 'api/auth/login',
      method: 'POST',
      data: args,
      withCredentials: true,
    })
  }

}
