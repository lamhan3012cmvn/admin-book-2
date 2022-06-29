import { CategoryModel } from "../../Models/caterogy.model";
import { ApiMethods, ApiRoutes } from "../interfaces/methodApi.interface";
import { ReturnListResponse } from "../interfaces/response.interface";
import Repository from "../repositoryApi";

const routeDeleteSubCategory: ApiRoutes = {
	method: ApiMethods.DELETE,
	url: 'admin/subCategories'
};

interface deleteSubCategoryDTO {
	id: number;
}
export const delateSubCategory = async (
	params: deleteSubCategoryDTO
): Promise<ReturnListResponse<CategoryModel>> => {
	return Repository(routeDeleteSubCategory, {
		params: { ...params }
	});
};
