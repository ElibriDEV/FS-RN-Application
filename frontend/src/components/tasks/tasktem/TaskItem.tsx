import {FunctionComponent} from "react";
import { format } from "date-fns";
import { Simulate } from 'react-dom/test-utils';
import paste = Simulate.paste;
import { useNavigate } from 'react-router-dom';

export interface TaskProps {
    id: number
    title: string
    description: string
    deadline: string
    completed: boolean
    createdAt: string
    updatedAt: string
    userId: number
}

export const TaskItem: FunctionComponent<TaskProps> = (props: TaskProps) => {
    const navigate = useNavigate()

    function onTaskClick() {
      navigate(`/task/${props.id}`)
    }

    const passed: boolean = Date.parse(props.deadline) < new Date().getTime() && !props.completed

    return (
        <div className={passed ? 'post bg-passed rounded-[15px] p-5 cursor-pointer' : 'post bg-primaryLight rounded-[15px] p-5 cursor-pointer'} onClick={onTaskClick}>
            <div className="title text-primary pb-2">
                <h2 className={`text-2xl font-semibold ${ passed ? ' text-red-900' : '' } ${props.completed ? 'line-through' : ''}`}>{props.title}</h2>
                <p className="text-center">{props.completed}</p>
                <p className="text-center"></p>
            </div>
            <div className="text-start py-2">
                <p>{props.description}</p>
            </div>
          <div className="flex flex-row justify-between pt-2 text-sm italic">
            <div className="flex flex-row gap-3">
              <div className="flex flex-row gap-1">
                <p>Создано: </p>
                <p>{format(props.createdAt, "MM/dd/yyyy")}</p>
              </div>
              { props.updatedAt !== props.createdAt ?? (
                <div className="flex flex-row gap-1">
                  <p>Обновлено: </p>
                  <p>{format(props.updatedAt, 'MM/dd/yyyy')}</p>
                </div>
              )}
            </div>
            <div className={passed ? 'flex flex-row gap-1 text-red-900' : 'flex flex-row gap-1'}>
              <p>Дедлайн: </p>
              <p>{format(props.deadline, "MM/dd/yyyy")}</p>
            </div>

          </div>
        </div>
    )
}