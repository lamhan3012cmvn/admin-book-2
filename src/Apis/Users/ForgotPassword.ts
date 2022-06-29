import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeLogin: ApiRoutes = {
	method: ApiMethods.GET,
	url: '/users/forgotPassword'
};
export const forgotPasswordAsync = async ({
	email
}: {
	email: string;
}): Promise<ReturnResponse<boolean>> => {
	return Repository(routeLogin, {
		params: {
			email,
			lang: 0,
			admin: 1
		}
	});
};
