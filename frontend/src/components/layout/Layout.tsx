import {FunctionComponent, PropsWithChildren} from "react";
import {Sidebar} from "../sidebar/Sidebar";
import {Outlet} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

export const Layout: FunctionComponent<PropsWithChildren> = () => {


    return(
        <div className="flex flex-row bg-primary h-screen">
            <Sidebar />
            <div className="p-2.5 basis-full">
                <div className="bg-white w-full h-full rounded-[20px] flex flex-col overflow-hidden">
                    <Outlet />
                </div>
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