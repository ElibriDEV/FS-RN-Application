import { useEffect, useState } from 'react';
import { UserService } from '../../services/user/user.service';
import { useCookies } from 'react-cookie';
import { AxiosResult } from '../../api/axiosManager/interfaces';
import { IDeleteSelfResponse, IGetSelfResponse, IUpdateSelfResponse } from '../../services/user/interfaces';
import { InnerLayout } from '../../components/layout/inner-layout/InnerLayout';
import { ModalWindowLayout } from '../../components/modal/Modal';
import { Button } from '@material-tailwind/react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

export const Profile = () => {
  const [userService] = useState(new UserService())
  const [access, , removeAccess] = useCookies(['access_token'])
  const [refresh, , removeRefresh] = useCookies(['refresh_token'])
  const [user, setUser] = useState<IGetSelfResponse | undefined>()
  const [edit, setEdit] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect((): void => {
    const getUser = async (): Promise<void> => {
      const userResponse: AxiosResult<IGetSelfResponse> = await userService.getSelf({
        access: access.access_token,
        refresh: refresh.refresh_token,
        removeAccess: removeAccess,
        removeRefresh: removeRefresh,
      })
      setUser(userResponse.data)
      setFirstName(userResponse.data?.firstName || "")
      setLastName(userResponse.data?.lastName || "")
      setEmail(userResponse.data?.email || "")
    }
    getUser().then()
  }, [access.access_token, refresh.refresh_token, removeAccess, removeRefresh, userService])

  const onDeleteConfirmClick = async (): Promise<void> => {
    const result: AxiosResult<IDeleteSelfResponse> = await userService.deleteSelf({
      access: access.access_token,
      refresh: refresh.refresh_token,
      removeAccess: removeAccess,
      removeRefresh: removeRefresh,
    })
    setShowModal(!showModal)
    if (result.isError) {
      toast(result.errorMessage)
    } else {
      removeAccess("access_token")
      removeRefresh("refresh_token")
    }
  }

  const modalReject = async (): Promise<void> => {
    setShowModal(!showModal)
  }

  const onSaveChanges = async (): Promise<void> => {
    const result: AxiosResult<IUpdateSelfResponse> = await userService.updateSelf({
      firstName: firstName,
      lastName: lastName,
      email: email,
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
    <>
      <InnerLayout header="Профиль">
        <div className="flex flex-col gap-5">
          <p>ID пользователя: {user?.id}</p>
          {edit ? (
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-3"
              value={firstName} onChange={(e) => setFirstName(e.target.value)} maxLength={255} />
          ) : (
            <p className="text-2xl content-center">{user?.firstName}</p>
          )}
          {edit ? (
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-3"
              value={lastName} onChange={(e) => setLastName(e.target.value)} maxLength={255} />
          ) : (
            <p className="text-2xl content-center">{user?.lastName}</p>
          )}
          {edit ? (
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-3"
              value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
          ) : (
            <p className="text-2xl content-center">{user?.email}</p>
          )}
          <p>Дата регистрации: {format(user?.createdAt || new Date(), 'MM/dd/yyyy')}</p>
          <div className="flex flex-row justify-between">
            <Button placeholder="" color="red" onClick={() => setShowModal(!showModal)}>Удалить аккаунт</Button>
            <div className="flex flex-row gap-5">
              {edit ? (
                <Button placeholder="" color="amber" onClick={() => setEdit(!edit)}>Отменить</Button>
              ) : (
                <Button placeholder="" color="amber" onClick={() => setEdit(!edit)}>Редактировать</Button>
              )}
              {edit ? (
                <Button placeholder="" className="bg-primary" onClick={onSaveChanges}>Сохранить</Button>
              ) : null}
            </div>
          </div>
        </div>
      </InnerLayout>

      {showModal ? (
        <ModalWindowLayout title={`Удаление аккаунта`} setShowModal={setShowModal} width={600}>
          <div className="pb-5 pt-2">
            <p className="text-center">Вы действительно хотите удалить свой аккаунт?</p>
          </div>
          <div className="flex flex-row, justify-between">
            <Button placeholder="Удалить" color="red" onClick={onDeleteConfirmClick}>Удалить</Button>
            <Button placeholder="Отменить" className="bg-primary" onClick={modalReject}>Отменить</Button>
          </div>
        </ModalWindowLayout>
      ) : null}
    </>
  )
}