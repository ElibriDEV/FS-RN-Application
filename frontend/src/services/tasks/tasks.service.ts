import {
    ICreateTaskRequest,
    ICreateTaskResponse,
    IDeleteTaskRequest,
    IDeleteTaskResponse, IGetTaskByIdRequest, IGetTaskByIdResponse,
    IGetTasksRequest,
    IGetTasksResponse,
    IUpdateTaskRequest,
    IUpdateTaskResponse,
    IUpdateTaskStatusRequest,
    IUpdateTaskStatusResponse,
} from './interfaces';
import { AbstractService } from '../../api/axiosManager/abstractService';
import { AxiosResult } from '../../api/axiosManager/interfaces';

export class TasksService extends AbstractService {

    public async getTasks(params: IGetTasksRequest): Promise<AxiosResult<IGetTasksResponse>> {
        return this.manager.backendRequest({
            url: `api/task/get/pagination/${params.page}/${params.perPage}`,
            method: "POST",
            data: { ascFields: params.ascFields, descFields: params.descFields },
            withCredentials: true,
            access: params.access,
            refresh: params.refresh,
            removeAccess: params.removeAccess,
            removeRefresh: params.removeRefresh,
        })
    }

    public async getTaskById(params: IGetTaskByIdRequest): Promise<AxiosResult<IGetTaskByIdResponse>> {
        return this.manager.backendRequest({
            url: `api/task/get/single/${params.id}`,
            method: "GET",
            withCredentials: true,
            access: params.access,
            refresh: params.refresh,
            removeAccess: params.removeAccess,
            removeRefresh: params.removeRefresh,
        })
    }

    public async createTask(params: ICreateTaskRequest): Promise<AxiosResult<ICreateTaskResponse>> {
        const {access, refresh, ...omittedParams} = params;
        return this.manager.backendRequest({
            url:'api/task/create',
            method: 'POST',
            data: omittedParams,
            withCredentials: true,
            access: access,
            refresh: refresh,
            removeAccess: params.removeAccess,
            removeRefresh: params.removeRefresh,
        })
    }

    public async updateTask(params: IUpdateTaskRequest): Promise<AxiosResult<IUpdateTaskResponse>> {
        const {access, refresh, ...omittedParams} = params;
        return this.manager.backendRequest({
            url:'api/task/update',
            method: 'PATCH',
            data: omittedParams,
            withCredentials: true,
            access: access,
            refresh: refresh,
            removeAccess: params.removeAccess,
            removeRefresh: params.removeRefresh,
        })
    }

    public async updateTaskStatus(params: IUpdateTaskStatusRequest): Promise<AxiosResult<IUpdateTaskStatusResponse>> {
        const {access, refresh, ...omittedParams} = params;
        return this.manager.backendRequest({
            url:'api/task/update/status',
            method: 'PATCH',
            data: omittedParams,
            withCredentials: true,
            access: access,
            refresh: refresh,
            removeAccess: params.removeAccess,
            removeRefresh: params.removeRefresh,
        })
    }

    public async deleteTask(params: IDeleteTaskRequest): Promise<AxiosResult<IDeleteTaskResponse>> {
        const {access, refresh, ...omittedParams} = params;
        return this.manager.backendRequest({
            url:'api/task/delete',
            method: 'DELETE',
            data: omittedParams,
            withCredentials: true,
            access: access,
            refresh: refresh,
            removeAccess: params.removeAccess,
            removeRefresh: params.removeRefresh,
        })
    }

}
