import {
    Card,
    Typography,
    List,
    ListItemSuffix,
} from "@material-tailwind/react";
import {
    Squares2X2Icon,
    FolderMinusIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    UserGroupIcon,
    ClipboardDocumentCheckIcon,
    Cog6ToothIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/solid";
import {IconsProps} from "./interfaces";
import {useState} from "react";
import {SidebarItem} from "./sidebar-item/SidebarItem";

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
            <List className="p-0 flex flex-col justify-between h-full font-['Light']" placeholder={undefined}>
                <div className="flex flex-col">
                    <SidebarItem index={1} selected={selected} redirect="/" onSelected={onSelected} text="Dashboard"
                                 icon={<Squares2X2Icon {...getIconProps(1)} />}/>
                    <SidebarItem index={2} selected={selected} redirect="/all-courses" onSelected={onSelected} text="All Courses"
                                 icon={<FolderMinusIcon {...getIconProps(2)} />}/>
                    <SidebarItem index={3} selected={selected} redirect="/messages" onSelected={onSelected} text="Messages"
                                 icon={<ChatBubbleOvalLeftEllipsisIcon {...getIconProps(3)} />}
                                 suffix={
                                     <ListItemSuffix placeholder={undefined}>
                                         <div className="bg-white text-black p-1.5 rounded-full">14</div>
                                     </ListItemSuffix>
                                 }/>
                    <SidebarItem index={4} selected={selected} redirect="/friends" onSelected={onSelected} text="Friends"
                                 icon={<UserGroupIcon {...getIconProps(4)} />}/>
                    <SidebarItem index={5} selected={selected} redirect="/schedule" onSelected={onSelected} text="Schedule"
                                 icon={<ClipboardDocumentCheckIcon {...getIconProps(5)} />}/>
                </div>
                <div className="flex flex-col">
                    <SidebarItem index={6} selected={selected} redirect="/settings" onSelected={onSelected} text="Settings"
                                 icon={<Cog6ToothIcon {...getIconProps(6)} />}/>
                    <SidebarItem index={7} selected={selected} redirect="/directory" onSelected={onSelected} text="Directory"
                                 icon={<InformationCircleIcon {...getIconProps(7)} />}/>
                </div>
            </List>
        </Card>
);
}