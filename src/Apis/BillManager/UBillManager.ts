import { BillManagerModel } from '../../Models/billManager.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import {
	ReturnListResponse,
	ReturnResponse
} from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeUpdateBillManager: ApiRoutes = {
	method: ApiMethods.PATCH,
	url: 'admin/orders'
};
export const UpdateBillManagerAsync = async (params: {
	pageNo: number;
	id: number;
	status: number;
}): Promise<
	ReturnResponse<{
		datas: BillManagerModel[];
		totalItem: number;
	}>
> => {
	return Repository(routeUpdateBillManager, {
		params: { ...params, lang: 0 }
	});
};
