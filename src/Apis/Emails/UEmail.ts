import { EmailModel } from '../../Models/emailRequests.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import {
	ReturnListResponse,
	ReturnResponse
} from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeUpdateEmail: ApiRoutes = {
	method: ApiMethods.PATCH,
	url: 'admin/emailRequests'
};
export const UpdateEmailAsync = async (params: {
	pageNo: number;
	id: number;
	status: number;
}): Promise<
	ReturnResponse<{
		datas: EmailModel[];
		totalItem: number;
	}>
> => {
	return Repository(routeUpdateEmail, {
		params: params
	});
};
