import {FunctionComponent} from "react";
import {Typography} from "@material-tailwind/react";
export interface PostProps {
    id: number
    title: string
    text: string
    createdAt: Date
    updatedAt: Date
    userId: number
}

export const PostItem: FunctionComponent<PostProps> = (props: PostProps) => {
    return (
        <div className="post" id={String(props.id)}>
            <div className={"title"}>
                <p className="text-center">{props.title}</p>
            </div>
            <div className="text-center">
                <p>{props.text}</p>
            </div>
        </div>
    )
}