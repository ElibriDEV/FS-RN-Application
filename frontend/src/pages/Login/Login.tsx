import React, { FormEvent, FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthService } from '../../services/auth/auth.service';
import { ILoginResponse } from '../../services/auth/interfaces';
import { AxiosResult } from '../../api/axiosManager/interfaces';

export const LoginPage: FunctionComponent = () => {
  const [email, setEmail] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState('')
  const [authService] = useState(new AuthService())
  const navigate = useNavigate();

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const registerClick = (): void => {
    navigate("/auth/register");
  }

  async function loginClick(event: FormEvent): Promise<void> {
    event.preventDefault()
      const response: AxiosResult<ILoginResponse> = await authService.login({email: email, password: password})
      if (!response.isError) {
        navigate('/');
        return;
      }
      if (response.status === 401) {
        toast('Неверный логин или пароль!');
      } else {
        toast(response.errorMessage?.toString())
      }
  }

  return (
    <form className="bg-white shadow-md rounded-[10px] px-8 pt-6 pb-8 mb-4" onSubmit={loginClick}>
      <h1 className="pb-5 text-4xl font-museoSans font-bold text-primary w-full text-center">
        Вход
      </h1>
      <div className="mb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email" value={email} placeholder="" onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Пароль
        </label>
        <input
          className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type={ isPasswordVisible ? 'text' : 'password'} placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)}
        />
        { isPasswordVisible ? (
          <button type="button" className="w-full text-right" onClick={togglePasswordVisibility}>
            Скрыть пароль
          </button>
        ) : (
          <button type="button" className="w-full text-right" onClick={togglePasswordVisibility}>
            Показать пароль
          </button>
        )}

      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-primary text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
          type="button" onClick={loginClick}>
          Войти
        </button>
      </div>
      <div className="flex justify-between pt-5">
        <p>Нет аккаунта?</p>
        <button className="text-primary hover:underline" onClick={registerClick}>Зарегистрироваться</button>
      </div>
    </form>
  )
}
