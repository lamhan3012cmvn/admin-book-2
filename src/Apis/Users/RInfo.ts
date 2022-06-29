import { UserLoginModel } from '../../Models/user.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import {
  ReturnResponse
} from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeGetUsers: ApiRoutes = {
	method: ApiMethods.GET,
	url: '/auth'
};
export const getInfoUserAsync = async ({
	token
}: {
	token: string;
}): Promise<
	ReturnResponse<UserLoginModel>
> => {
	return Repository(routeGetUsers, {
		params: {
			token
		}
	});
};
