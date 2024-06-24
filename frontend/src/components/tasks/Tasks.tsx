import React, { FunctionComponent, useEffect, useState } from "react";
import { TaskItem, TaskProps } from "./tasktem/TaskItem";
import { TasksService } from "../../services/tasks/tasks.service";
import { Pagination } from "../pagination/Pagination";
import { useCookies } from 'react-cookie';
import { IGetTasksResponse } from '../../services/tasks/interfaces';
import { AxiosResult } from '../../api/axiosManager/interfaces';
import { toast } from 'react-toastify';

export const Tasks: FunctionComponent = () => {
    const [tasks, setTasks] = useState<TaskProps[] | undefined>()
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [notFound, setNotFound] = useState<boolean>(false)
    const [access, , removeAccess] = useCookies(['access_token'])
    const [refresh, , removeRefresh] = useCookies(['refresh_token'])
    const [taskService] = useState(new TasksService())

    useEffect((): void => {
        const getPosts = async (page: number): Promise<void> => {
            const response: AxiosResult<IGetTasksResponse> = await taskService.getTasks({
                page: page, 
                perPage: 10, 
                access: access.access_token, 
                refresh: refresh.refresh_token,
                descFields: ['deadline'],
                removeAccess: removeAccess,
                removeRefresh: removeRefresh,
            })
            if (response.isError){
                if (response.status === 404) {
                    setNotFound(true);
                } else {
                    toast(response.errorMessage)
                }
            } else {
                setTasks(response.data?.rows)
                setTotalPages(response.data?.totalPages || 1)
            }
        }
        getPosts(page).then()
    }, [access.access_token, page, taskService, refresh.refresh_token])

    const onNext = async (): Promise<void> => {
        setPage(page + 1)
    }
    const onPrev = async (): Promise<void> => {
        setPage(page - 1)
    }

    const onPageClick = async (page: number): Promise<void> => {
        setPage(page)
    }

    return (
        <div className="flex flex-col h-full">
            {
                !notFound ? (
                    <div className="pb-5">
                        <div className="flex flex-col gap-5">
                            {tasks?.map((post: TaskProps) => <TaskItem key={post.id} {...post} />)}
                        </div>
                        <div className="py-5">
                            <Pagination page={page} totalPages={totalPages} onNext={onNext} onPrev={onPrev} onPageClick={onPageClick} />
                        </div>

                    </div>
                ) : (
                    <div>Задач нет</div>
                )
            }
        </div>
    )
}
