import {PostProps} from "../../components/post/postItem/PostItem";

export type GetPostsRequestParams = {
    page: string | number
    perPage: string | number
}

export interface GetPostsResponse {
    currentPage: number
    totalPages: number
    rows: PostProps[]
}
