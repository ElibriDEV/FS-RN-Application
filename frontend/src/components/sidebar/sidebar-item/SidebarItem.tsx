import React, {FunctionComponent, ReactNode} from "react";
import {colors} from "@material-tailwind/react/types/generic";
import {ListItem, ListItemPrefix} from "@material-tailwind/react";
import { useNavigate, NavigateFunction } from "react-router-dom";

export interface SidebarItemProps {
    onSelected: (index: number) => void
    redirect: string
    selected: number
    index: number
    text: string
    icon: ReactNode | undefined
    suffix?: ReactNode | undefined
    color?: colors
    colorActive?: colors
    textColor?: colors
    textColorActive?: colors
}

export const SidebarItem: FunctionComponent<SidebarItemProps> = (props: SidebarItemProps) => {

    const navigate: NavigateFunction = useNavigate();

    const getListItemProps = (thisIndex: number) => {
        return {
            className: `
            hover:bg-transparent 
            active:bg-transparent 
            focus:bg-transparent 
            my-2 
            rounded-none 
            hover:border-l-4 
            ${props.selected === thisIndex && "border-l-4"}
            `,
            onClick: (): void => {
                props.onSelected(thisIndex)
                navigate(props.redirect)
            },
        }
    }

    return (
        <ListItem {...getListItemProps(props.index)} placeholder={undefined}>
            <ListItemPrefix placeholder={undefined}>
                {props.icon}
            </ListItemPrefix>
            <p className={`text-white ${props.selected === props.index ? "font-bold" : "font-normal"}`}>{props.text}</p>
            {props.suffix}
        </ListItem>
    )
}