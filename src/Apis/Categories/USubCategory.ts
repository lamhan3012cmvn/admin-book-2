import { ReturnListResponse } from './../interfaces/response.interface';
import { CategoryModel } from '../../Models/caterogy.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import Repository from '../repositoryApi';

const routeUpdateSubCategory: ApiRoutes = {
	method: ApiMethods.PATCH,
	url: 'admin/subCategories'
};

interface updateSubCategoryDTO {
	id: number;
	nameVn: string;
	nameEn: string;
	status: number;
	categoryId: number;
}

export const updateSubCategory = async (
	payload: updateSubCategoryDTO
): Promise<ReturnListResponse<CategoryModel>> => {
	return Repository(routeUpdateSubCategory, {
		body: { ...payload }
	});
};
