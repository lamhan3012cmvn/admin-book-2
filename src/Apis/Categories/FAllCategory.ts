import { ReturnListResponse } from './../interfaces/response.interface';
import { CategoryModel } from '../../Models/caterogy.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import Repository from '../repositoryApi';

const routeFAllCategory: ApiRoutes = {
	method: ApiMethods.GET,
	url: 'book/all'
};

export const findAllSubCategory = async (): Promise<
	ReturnListResponse<any>
> => {
	return Repository(routeFAllCategory);
};
