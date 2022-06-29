import { BillManagerModel } from '../../Models/billManager.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import {
	ReturnListResponse,
	ReturnResponse
} from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeGetBillManager: ApiRoutes = {
	method: ApiMethods.GET,
	url: 'admin/orders'
};
export const getBillManagerAsync = async (
	pageNo: number,
	lang: number
): Promise<
	ReturnResponse<{
		datas: BillManagerModel[];
		totalItem: number;
	}>
> => {
	return Repository(routeGetBillManager, {
		params: {
			pageNo: pageNo,
			lang
		}
	});
};
