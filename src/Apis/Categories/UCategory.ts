import { ReturnListResponse } from './../interfaces/response.interface';
import { CategoryModel } from '../../Models/caterogy.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import Repository from '../repositoryApi';

const routeUpdateProductText: ApiRoutes = {
	method: ApiMethods.PATCH,
	url: 'admin/categories'
};

interface updateProductDTO {
	id: number;
	nameVn: string;
	nameEn: string;
	status: number;
}
export const updateCategory = async (
	payload: updateProductDTO
): Promise<ReturnListResponse<CategoryModel>> => {
	return Repository(routeUpdateProductText, {
		body: { ...payload }
	});
};
