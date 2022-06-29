import { CategoryModel } from '../../Models/caterogy.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnListResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeCreateCategory: ApiRoutes = {
	method: ApiMethods.POST,
	url: 'admin/categories'
};

interface createProductDTO {
	nameVn: string;
	nameEn: string;
}
export const createCategory = async (
	payload: createProductDTO
): Promise<ReturnListResponse<CategoryModel>> => {
	return Repository(routeCreateCategory, {
		body: { ...payload }
	});
};
