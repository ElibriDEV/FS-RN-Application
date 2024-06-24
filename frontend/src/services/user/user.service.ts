import { AbstractService } from '../../api/axiosManager/abstractService';
import {
  IDeleteSelfRequest, IDeleteSelfResponse,
  IGetSelfRequest,
  IGetSelfResponse,
  IUpdateSelfRequest,
  IUpdateSelfResponse,
} from './interfaces';
import { AxiosResult } from '../../api/axiosManager/interfaces';

export class UserService extends AbstractService {

  public async getSelf(params: IGetSelfRequest): Promise<AxiosResult<IGetSelfResponse>> {
    return this.manager.backendRequest({
      url: `api/user/self`,
      method: "GET",
      withCredentials: true,
      access: params.access,
      refresh: params.refresh,
      removeAccess: params.removeAccess,
      removeRefresh: params.removeRefresh,
    })
  }

  public async updateSelf(params: IUpdateSelfRequest): Promise<AxiosResult<IUpdateSelfResponse>> {
    console.log(2)
    const {access, refresh, ...omittedParams} = params;
    console.log(omittedParams)
    return this.manager.backendRequest({
      url: `api/user/self`,
      method: "PATCH",
      data: omittedParams,
      withCredentials: true,
      access: params.access,
      refresh: params.refresh,
      removeAccess: params.removeAccess,
      removeRefresh: params.removeRefresh,
    })
  }

  public async deleteSelf(params: IDeleteSelfRequest): Promise<AxiosResult<IDeleteSelfResponse>> {
    return this.manager.backendRequest({
      url: `api/user/self`,
      method: "DELETE",
      withCredentials: true,
      access: params.access,
      refresh: params.refresh,
      removeAccess: params.removeAccess,
      removeRefresh: params.removeRefresh,
    })
  }

}