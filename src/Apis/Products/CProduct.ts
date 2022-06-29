import { ProductModel } from '../../Models/product.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import {
	ReturnListResponse,
	ReturnResponse
} from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeCreateProductText: ApiRoutes = {
	method: ApiMethods.POST,
	url: 'admin/products'
};
export const createProductAsync = async ({
	categoryId,
	subcategoryId,
	pageNo = 0
}: {
	categoryId: number;
	subcategoryId: number;
	pageNo: number;
}): Promise<
	ReturnResponse<{
		datas: ProductModel[];
		totalItem: number;
	}>
> => {
	return Repository(routeCreateProductText, {
		params: {
			categoryId,
			subcategoryId,
			pageNo
		}
	});
};
