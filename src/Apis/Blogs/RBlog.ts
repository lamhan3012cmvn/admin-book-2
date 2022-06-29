import { BlogModel } from './../../Models/blog.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnListResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeGetBlog: ApiRoutes = {
	method: ApiMethods.GET,
	url: 'admin/posts'
};
export const getBlogAsync = async (): Promise<
	ReturnListResponse<BlogModel>
> => {
	return Repository(routeGetBlog);
};
