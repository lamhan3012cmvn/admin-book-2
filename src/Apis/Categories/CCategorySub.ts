import { CategoryModel } from '../../Models/caterogy.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnListResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeCreateCategorySub: ApiRoutes = {
	method: ApiMethods.POST,
	url: 'admin/subCategories'
};

interface createCategorySubDTO {
	nameVn: string;
	nameEn: string;
	categoryId: number;
}
export const createCategorySub = async (
	payload: createCategorySubDTO
): Promise<ReturnListResponse<CategoryModel>> => {
	return Repository(routeCreateCategorySub, {
		body: { ...payload }
	});
};
