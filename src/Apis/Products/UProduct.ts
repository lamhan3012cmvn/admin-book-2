import { ProductModel } from '../../Models/product.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import {
	ReturnListResponse,
	ReturnResponse
} from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeUpdateProductText: ApiRoutes = {
	method: ApiMethods.PATCH,
	url: 'admin/products'
};
export const updateProductAsync = async (
	params: { pageNo: number },
	payload: {
		productId: number;
		categoryId: number;
		subCategoryId: number;
		images: Array<{
			id: number;
			url: string;
			status: number;
		}>;
	}
): Promise<
	ReturnResponse<{
		datas: ProductModel[];
		totalItem: number;
	}>
> => {
	return Repository(routeUpdateProductText, {
		params: params,
		body: payload
	});
};
