import React, { FormEvent, FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth/auth.service';
import { toast } from 'react-toastify';
import { IRegisterResponse } from '../../services/auth/interfaces';
import { AxiosResult } from '../../api/axiosManager/interfaces';

export const RegisterPage: FunctionComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [authService] = useState(new AuthService())
  const navigate = useNavigate();

  const loginClick = (): void => {
    navigate("/auth/login");
  }

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const registerClick = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    if (password !== repeatPassword) {
      toast("Пароли не совпадают!");
      return;
    }
    const response: AxiosResult<IRegisterResponse> = await authService.register({ firstName: firstName, lastName: lastName, email: email, password: password })
    if (!response.isError) {
      navigate("/");
      return;
    }
    toast(response.errorMessage)
  }

  return (
    <form className="bg-white shadow-md rounded-[10px] px-8 pt-6 pb-8 mb-4" onSubmit={registerClick}>
      <h1 className="pb-5 text-4xl font-museoSans font-bold text-primary w-full text-center">
        Регистрация
      </h1>
      <div className="mb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Имя
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text" value={firstName} placeholder="" onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Псевдоним
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text" value={lastName} placeholder="" onChange={(e) => setLastName(e.target.value)}
        />
      </div>
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
          type={ isPasswordVisible ? 'text' : 'password'} placeholder="******************" value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      <div className="mb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Повтор пароля
        </label>
        <input
          className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password" placeholder="******************" value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-primary text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
          type="button" onClick={registerClick}>
          Зарегистрироваться
        </button>
      </div>
      <div className="flex justify-between pt-5">
        <p>Уже есть аккаунт?</p>
        <button className="text-primary hover:underline" onClick={loginClick}>Войти</button>
      </div>
    </form>
  )
}
