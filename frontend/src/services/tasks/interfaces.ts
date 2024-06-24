import { IWithCookieCredentials } from '../interfaces';
import { TaskProps } from '../../components/tasks/tasktem/TaskItem';


export interface IGetTasksRequest extends IWithCookieCredentials {
    page: string | number;
    perPage: string | number;
    ascFields?: string[];
    descFields?: string[];
}

export interface IGetTasksResponse {
    currentPage: number;
    totalPages: number;
    rows: TaskProps[];
}

export interface IGetTaskByIdRequest extends IWithCookieCredentials {
    id: number;
}

export interface IGetTaskByIdResponse extends TaskProps {}

export interface ICreateTaskRequest extends IWithCookieCredentials {
    title: string;
    description?: string;
    completed?: boolean;
    deadline?: Date;
}

export interface ICreateTaskResponse {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    completed: boolean;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUpdateTaskRequest extends IWithCookieCredentials {
    id: number;
    title?: string;
    description?: string;
    completed?: boolean;
    deadline?: Date;
}

export interface IUpdateTaskResponse extends ICreateTaskResponse {}

export interface IUpdateTaskStatusRequest extends IWithCookieCredentials {
    ids: number[];
    completed: boolean;
}

export type IUpdateTaskStatusResponse = IUpdateTaskResponse[];

export interface IDeleteTaskRequest extends IWithCookieCredentials {
    ids: number[];
}

export interface IDeleteTaskResponse {
    message: string;
}
