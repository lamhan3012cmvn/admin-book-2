import { CategoryModel } from '../../Models/caterogy.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnListResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeDeleteCategory: ApiRoutes = {
	method: ApiMethods.DELETE,
	url: 'admin/categories'
};

interface deleteProductDTO {
	id: number;
}
export const delateCategory = async (
	payload: deleteProductDTO
): Promise<ReturnListResponse<CategoryModel>> => {
	return Repository(routeDeleteCategory, {
		params: { ...payload }
	});
};
