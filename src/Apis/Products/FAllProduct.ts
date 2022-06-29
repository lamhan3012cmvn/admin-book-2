import { ProductModel } from '../../Models/product.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeFindAll: ApiRoutes = {
	method: ApiMethods.GET,
	url: 'book/all'
};
export const findAllProduct = async ({
	pageNo = 0,
	search
}: {
	pageNo: number;
	search: string;
}): Promise<
	ReturnResponse<{
		datas: ProductModel[];
		totalItem: number;
	}>
> => {
	return Repository(routeFindAll, {
		params: {
			// pageNo,
			// search
		}
	});
};
