import { ProductModel } from '../../Models/product.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnListResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeDeleteProductText: ApiRoutes = {
	method: ApiMethods.DELETE,
	url: 'admin/products'
};
export const deleteProduct = async ({
	id,
	pageNo = 0
}: {
	id: number;
	pageNo: number;
}): Promise<Array<ReturnListResponse<ProductModel>>> => {
	return Repository(routeDeleteProductText, {
		params: {
			id,
			pageNo
		}
	});
};
