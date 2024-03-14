import React, {FunctionComponent, useEffect, useState} from "react";
import {PostItem, PostProps} from "./postItem/PostItem";
import {AxiosResult} from "../../api/AxiosManager";
import {PostsService} from "../../services/posts/posts.service";
import {GetPostsResponse} from "../../services/posts/interfaces";
import {Pagination} from "../pagination/Pagination";

export const Posts: FunctionComponent = () => {
    const [posts, setPosts] = useState<PostProps[] | undefined>()
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    useEffect((): void => {
        const postsService: PostsService = new PostsService()
        const getPosts = async (page: number): Promise<void> => {
            const response: AxiosResult<GetPostsResponse> = await postsService.getPosts({page: page, perPage: 10})
            if (response.isError){
                console.log("ERROR ", response)
            } else {
                setPosts(response.data?.rows)
                setTotalPages(response.data?.totalPages || 1)
            }
        }
        getPosts(page).then()
    }, [page])

    const onNext = async (): Promise<void> => {
        setPage(page + 1)
    }
    const onPrev = async (): Promise<void> => {
        setPage(page - 1)
    }

    const onPageClick = async (page: number): Promise<void> => {
        setPage(page)
    }

    return (
        <>
            <div className="flex flex-col justify-between h-full">
                <div>
                    {posts?.map((post: PostProps) => <PostItem key={post.id} {...post} />)}
                </div>
                <Pagination page={page} totalPages={totalPages} onNext={onNext} onPrev={onPrev} onPageClick={onPageClick} />
            </div>
        </>
    )
}
