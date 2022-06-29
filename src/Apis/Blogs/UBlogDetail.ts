import { ReturnResponse } from './../interfaces/response.interface';
import { BlogDetail } from './../../Models/blog.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import Repository from '../repositoryApi';

const routeUpdateBlog: ApiRoutes = {
	method: ApiMethods.PATCH,
	url: 'admin/posts'
};
export const updateBlogDetailAsync = async (payload: {
	id: number;
	title: string;
	status: number;
	postId: number;
	content: string;
}): Promise<ReturnResponse<BlogDetail>> => {
	console.log(`LHA:  ===> file: UBlogDetail.ts ===> line 11 ===> payload`, payload)
	return Repository(routeUpdateBlog, {
		body: payload
	});
};
