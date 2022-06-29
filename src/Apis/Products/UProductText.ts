import { ProductModel } from '../../Models/product.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnListResponse, ReturnResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeUpdateProductText: ApiRoutes = {
	method: ApiMethods.POST,
	url: 'book'
};

export const updateProductText = async (
	payload: any
): Promise<ReturnResponse<{
	datas: ProductModel[];
	totalItem: number;
}>> => {
	return Repository(routeUpdateProductText, {
		params: {},
		body: { ...payload }
	});
};
