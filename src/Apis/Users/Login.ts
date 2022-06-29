import { UserModel } from '../../Models/user.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import {
	ReturnListResponse,
	ReturnResponse
} from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeLogin: ApiRoutes = {
	method: ApiMethods.POST,
	url: 'auth/login'
};
export const loginAdminAsync = async ({
	email,
	password
}: {
	email: string;
	password: string;
}): Promise<
	ReturnResponse<{
		token: string;
		type: string;
		role: string;
	}>
> => {
	return Repository(routeLogin, {
		body: {
			email,
			password
		}
	});
};
