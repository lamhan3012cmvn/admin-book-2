import { EmailModel } from '../../Models/emailRequests.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import {
	ReturnListResponse,
	ReturnResponse
} from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeEmailRequestShip: ApiRoutes = {
	method: ApiMethods.GET,
	url: 'admin/emailRequests'
};
export const EmailRequestShipAsync = async (
	pageNo: number
): Promise<
	ReturnResponse<{
		datas: EmailModel[];
		totalItem: number;
	}>
> => {
	return Repository(routeEmailRequestShip, {
		params: {
			pageNo: pageNo
		}
	});
};
