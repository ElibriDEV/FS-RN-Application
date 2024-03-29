import {FunctionComponent, PropsWithChildren} from "react";
import {Sidebar} from "../sidebar/Sidebar";
import {Outlet} from "react-router-dom";

export const Layout: FunctionComponent<PropsWithChildren> = () => {
    return(
        <div className="flex flex-row bg-primary h-full">
            <Sidebar />
            <div className="py-2.5 pr-2.5 basis-full">
                <div className="bg-white w-full h-full rounded-[40px] flex flex-col">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}