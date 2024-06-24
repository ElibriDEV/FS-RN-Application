import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TasksService } from '../../services/tasks/tasks.service';
import { useCookies } from 'react-cookie';
import { IGetTaskByIdResponse, IUpdateTaskResponse } from '../../services/tasks/interfaces';
import { AxiosResult } from '../../api/axiosManager/interfaces';
import { Button } from '@material-tailwind/react';
import { ModalWindowLayout } from '../../components/modal/Modal';
import { format } from 'date-fns';
import Datepicker from 'react-tailwindcss-datepicker';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';

export const SingleTask = () => {
  const params = useParams()
  const [taskService] = useState(new TasksService())
  const [edit, setEdit] = useState(false)
  const [task, setTask] = useState<IGetTaskByIdResponse>()
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [completed, setCompleted] = useState<boolean>()
  const [deadline, setDeadline] = useState<Date>(new Date())
  const [access, , removeAccess] = useCookies(['access_token'])
  const [refresh, , removeRefresh] = useCookies(['refresh_token'])
  const navigate = useNavigate();

  useEffect(() => {

    const getTaskById = async (id: number) => {
      const result: AxiosResult<IGetTaskByIdResponse> = await taskService.getTaskById({
        id: id,
        access: access.access_token,
        refresh: refresh.refresh_token,
        removeAccess: removeAccess,
        removeRefresh: removeRefresh,
      })
      setTask(result.data)
      if (result.data) {
        setDescription(result.data.description)
        setTitle(result.data.title)
        setCompleted(result.data.completed)
        setDeadline(new Date(Date.parse(result.data.deadline)))
      }
    }
    getTaskById(Number(params.id)).then()
  }, [access.access_token, params.id, refresh.refresh_token, taskService]);

  const onDeleteClick = (): void => {
    setShowModal(!showModal)
  }

  const modalReject = (): void => {
    setShowModal(!showModal)
  }

  const onDeleteConfirmClick = async (): Promise<void> => {
    if (task) {
      await taskService.deleteTask({
        ids: [task.id],
        access: access.access_token,
        refresh: refresh.refresh_token,
        removeAccess: removeAccess,
        removeRefresh: removeRefresh,
      })
      navigate("/")
    }
  }

  const handleValueChange = (newValue: any): void => {
    setDeadline(newValue.startDate);
  }

  const onSaveClick = async () => {
    const result: AxiosResult<IUpdateTaskResponse> = await taskService.updateTask({
      id: Number(params.id),
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
      window.location.reload();
    }
  }

  return (
    <div className="p-5">
      <div className="bg-primaryLight rounded-[15px] p-3 flex flex-row justify-between">
        { edit ? (
          <input className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-3"
                 value={title} onChange={(e) => setTitle(e.target.value)} maxLength={255}/>
        ) : (
          <h1 className="text-2xl content-center">{task?.title}</h1>
        ) }

        <div className="flex flex-row gap-5">
          <Button placeholder="" color="amber" onClick={() => setEdit(!edit)}>Редактировать</Button>
          <Button placeholder="" color="red" onClick={onDeleteClick}>Удалить</Button>
        </div>

      </div>
      <div className="py-3 px-2">
        <div className="py-5">
          { edit ? (
            <TextareaAutosize className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              value={description} onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <p>{task?.description}</p>
          ) }

        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3">
            <p className="content-center">Статус: </p>
            <p className="content-center">{completed ? 'Выполнено' : 'Не выполнено'}</p>
            { edit ? (
              <>
                <p>|</p>
                <button onClick={() => setCompleted(!completed)} className="hover:underline">Изменить</button>
              </>
            ) : null }

          </div>
          <div className="flex flex-row gap-3">
            <p>Дата создания: </p>
            <p>{format(task?.createdAt || new Date(), 'MM/dd/yyyy')}</p>
          </div>
          <div className="flex flex-row gap-3">
            <p>Дата последнего обновления: </p>
            <p>{format(task?.updatedAt || new Date(), 'MM/dd/yyyy')}</p>
          </div>
          <div className="flex flex-row gap-3">
            <p className="content-center">Дедлайн: </p>
            { edit ? (
              <Datepicker
                asSingle={true}
                value={{ startDate: deadline, endDate: deadline }}
                onChange={handleValueChange}
              />
            ) : (
              <p>{format(deadline, 'MM/dd/yyyy')}</p>
            )}
          </div>
        </div>
      </div>

      { edit ? (
        <div className="flex flex-row justify-between">
          <Button placeholder="" color="red" onClick={() => {
            setEdit(!edit);
            window.location.reload();
          }}>Отменить</Button>
          <Button className="bg-primary" placeholder="" onClick={onSaveClick}>Сохранить</Button>
        </div>
      ) : null }

      {showModal ? (
        <ModalWindowLayout title={`Удалить "${task?.title}"`} setShowModal={setShowModal} width={600}>
          <div className="pb-5 pt-2">
            <p className="text-center">Вы действительно хотите удалить "{task?.title}"?</p>
          </div>
          <div className="flex flex-row, justify-between">
            <Button placeholder="Удалить" color="red" onClick={onDeleteConfirmClick}>Удалить</Button>
            <Button placeholder="Отменить" className="bg-primary" onClick={modalReject}>Отменить</Button>
          </div>
        </ModalWindowLayout>
      ) : null}

    </div>
  )
}