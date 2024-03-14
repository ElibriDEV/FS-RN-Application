import {AxiosManager, AxiosResult, IAxiosManager} from "../../api/AxiosManager";
import {GetPostsRequestParams, GetPostsResponse} from "./interfaces";

export class PostsService {
    private manager: IAxiosManager

    // dependency injection for "maybe" tests
    constructor(manager: IAxiosManager = new AxiosManager()) {
        this.manager = manager
    }

    public async getPosts(options: GetPostsRequestParams): Promise<AxiosResult<GetPostsResponse>> {
        return this.manager.backendRequest<GetPostsResponse>({ method: "GET", url: "api/post/all", params: options })
    }
}
