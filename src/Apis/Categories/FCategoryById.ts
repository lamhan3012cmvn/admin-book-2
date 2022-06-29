import { CategoryModel } from '../../Models/caterogy.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeFSubCategory: ApiRoutes = {
	method: ApiMethods.DELETE,
	url: 'admin/categories/category'
};

export const findByIdCategory = async (params: {
	id: number;
}): Promise<ReturnResponse<CategoryModel>> => {
	return Repository(routeFSubCategory, {
		params: { ...params }
	});
};
