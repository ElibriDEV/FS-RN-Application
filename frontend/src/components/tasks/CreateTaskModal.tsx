import { ModalWindowLayout } from '../modal/Modal';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Datepicker from 'react-tailwindcss-datepicker';
import { Button } from '@material-tailwind/react';
import { TasksService } from '../../services/tasks/tasks.service';
import { useCookies } from 'react-cookie';
import { AxiosResult } from '../../api/axiosManager/interfaces';
import { ICreateTaskResponse } from '../../services/tasks/interfaces';
import { toast } from 'react-toastify';

interface props {
  setShowModal: (arg: boolean) => void
}

export const CreateTaskModal = (props: props) => {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [completed, setCompleted] = useState<boolean>(false)
  const [deadline, setDeadline] = useState<Date>(new Date())
  const [taskService] = useState(new TasksService())
  const [access, , removeAccess] = useCookies(['access_token'])
  const [refresh, , removeRefresh] = useCookies(['refresh_token'])

  const handleValueChange = (newValue: any): void => {
    setDeadline(newValue.startDate);
  }

  const onCreateClick = async (): Promise<void> => {
    const result: AxiosResult<ICreateTaskResponse> = await taskService.createTask({
      title: title,
      description: description,
      completed: completed,
      deadline: deadline,
      access: access.access_token,
      refresh: refresh.refresh_token,
      removeAccess: removeAccess,
      removeRefresh: removeRefresh,
    })
    if (result.isError) {
      toast(result.errorMessage)
    } else {
      window.location.reload()
    }
  }

  return (
    <ModalWindowLayout title="Создание задачи" setShowModal={props.setShowModal} width={700} >
      <div className="flex flex-col gap-3">
        <div>
          <p>Название:</p>
          <input className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Новая задача" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <p>Содержание:</p>
          <TextareaAutosize
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description} placeholder={"Содержание"} onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <p>Дедлайн:</p>
          <Datepicker
            asSingle={true}
            value={{ startDate: deadline, endDate: deadline }}
            onChange={handleValueChange}
          />
        </div>
        <div className="flex flex-row gap-2">
          <p>Статус:</p>
          <button onClick={() => setCompleted(!completed)} className={`hover:underline ${ completed ? "text-green-700" : "text-red-900" }`}>
            { completed ? "Выполнено" : "Не выполнено" }
          </button>
        </div>
        <div className="flex flex-row justify-between">
          <Button placeholder="" color="red" onClick={() => props.setShowModal(false)}>Отменить</Button>
          <Button className="bg-primary" placeholder="" onClick={onCreateClick}>Создать</Button>
        </div>
      </div>
    </ModalWindowLayout>
  )
}