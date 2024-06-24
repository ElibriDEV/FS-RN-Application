import { AxiosResult } from '../../api/axiosManager/interfaces';
import { IGetSelfResponse } from '../../services/user/interfaces';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { UserService } from '../../services/user/user.service';
import { Button } from '@material-tailwind/react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const RSidebar = () => {
  const [user, setUser] = useState<IGetSelfResponse>()
  const [access, , removeAccess] = useCookies(['access_token'])
  const [refresh, , removeRefresh] = useCookies(['refresh_token'])
  const [value, onChange] = useState<Value>(new Date());
  const [userService] = useState(new UserService())

  useEffect(() => {
    async function getUser() {
      const response: AxiosResult<IGetSelfResponse> = await userService.getSelf({
        access: access.access_token,
        refresh: refresh.refresh_token,
        removeAccess: removeAccess,
        removeRefresh: removeRefresh,
      })
      setUser(response.data)
    }
    getUser().then()
  }, [access.access_token, refresh.refresh_token, removeAccess, removeRefresh, userService]);

  function onLogoutClick() {
    removeAccess("access_token")
    removeRefresh("refresh_token")
  }



  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];

  const dateEpoch: Date = new Date();
  dateEpoch.setHours(0, 0, 0, 0)

  return (
    <div className="w-[calc(100%/2)] bg-gray-100 rounded-r-[40px] p-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-end gap-3">
          <p className="content-center font-semibold">Привет, {user?.firstName} {user?.lastName}!</p>
          <Button variant="filled" className="bg-primary" placeholder="" onClick={onLogoutClick}>Выход</Button>
        </div>
        <Calendar className="!border-0 !w-full rounded-[10px]" onChange={onChange} value={value}
                  tileClassName={({ activeStartDate, date, view }): string => {
                    if (date.getTime() === dateEpoch.getTime()) {
                      return "!bg-primary !text-white"
                    }
                    return ""
                  }}
        />
      </div>
    </div>
  )
}