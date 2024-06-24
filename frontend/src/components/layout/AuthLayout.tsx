import { FunctionComponent, PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthLayout: FunctionComponent<PropsWithChildren> = () => {
  return (
    <div className="min-h-screen bg-primary px-[30px] py-[30px] place-content-center">
      <div className="w-full max-w-[400px] mx-auto">
        <Outlet />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}