import { ReturnResponse } from './../interfaces/response.interface';
import { CategoryModel } from '../../Models/caterogy.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import Repository from '../repositoryApi';

const routeFSubCategory: ApiRoutes = {
	method: ApiMethods.DELETE,
	url: 'admin/categories/subCategory'
};

export const findByIdSubCategory = async (params: {
	id: number;
}): Promise<ReturnResponse<CategoryModel>> => {
	return Repository(routeFSubCategory, {
		params: { ...params }
	});
};
