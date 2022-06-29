import { UserModel } from '../../Models/user.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import {
	ReturnListResponse,
	ReturnResponse
} from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeGetUsers: ApiRoutes = {
	method: ApiMethods.GET,
	url: 'admin/users'
};
export const getUserAsync = async ({
	pageNo = 0
}: {
	pageNo: number;
}): Promise<
	ReturnResponse<{
		datas: UserModel[];
		totalItem: number;
	}>
> => {
	return Repository(routeGetUsers, {
		params: {
			pageNo
		}
	});
};
