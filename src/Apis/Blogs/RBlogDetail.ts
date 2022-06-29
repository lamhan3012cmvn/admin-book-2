import { ReturnResponse } from './../interfaces/response.interface';
import { BlogDetail } from './../../Models/blog.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import Repository from '../repositoryApi';

const routeGetBlog: ApiRoutes = {
	method: ApiMethods.GET,
	url: 'posts/post'
};
export const getBlogDetailAsync = async ({
	id
}: {
	id: number;
}): Promise<ReturnResponse<BlogDetail>> => {
  console.log(`LHA:  ===> file: RBlogDetail.ts ===> line 15 ===> id`, id)
	return Repository(routeGetBlog, {
		params: {
			id
		}
	});
};
