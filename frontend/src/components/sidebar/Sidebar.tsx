import { Card, Typography, List } from "@material-tailwind/react";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import { IconsProps } from "./interfaces";
import { useState } from "react";
import { SidebarItem } from "./sidebar-item/SidebarItem";
import { UserCircleIcon } from '@heroicons/react/16/solid';

export const Sidebar = () => {
    const [selected, setSelected] = useState(1);

    const onSelected = (index: number): void => {
        setSelected(index)
    }

    const getIconProps = (index: number): IconsProps => {
        return {
            color: selected !== index ? '#e0e7ff' : '#ffffff',
            width: "30px",
            height: "30px",
        }
    }

    return (
        <Card className="h-[100vh] rounded-none w-full max-w-[15rem] shadow-xl shadow-blue-gray-900/5 bg-primary" placeholder={undefined}>
            <div className="mb-2 p-4">
                <Typography variant="h5" color="white" placeholder={undefined}>
                    Sidebar
                </Typography>
            </div>
            <List className="p-0 flex flex-col justify-between h-full" placeholder={undefined}>
                <div className="flex flex-col">
                    <SidebarItem index={1} selected={selected} redirect="/" onSelected={onSelected} text="Главная"
                                 icon={<Squares2X2Icon {...getIconProps(1)} />}/>
                    <SidebarItem index={3} selected={selected} redirect="/account" onSelected={onSelected}
                                 text="Профиль" icon={<UserCircleIcon {...getIconProps(3)} />}/>
                </div>
            </List>
        </Card>
);
}