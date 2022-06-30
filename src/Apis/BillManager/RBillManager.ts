import { BillManagerModel } from '../../Models/billManager.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import {
	ReturnListResponse,
	ReturnResponse
} from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeGetBillManager: ApiRoutes = {
	method: ApiMethods.GET,
	url: 'order/all'
};
export const getBillManagerAsync = async (
): Promise<
	ReturnResponse<any>
> => {
	return Repository(routeGetBillManager, {
		params: {
		}
	});
};
