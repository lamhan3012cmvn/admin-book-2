import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnListResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeGetSidebar: ApiRoutes = {
	method: ApiMethods.GET,
	url: 'admin/postTexts'
};
export const getSideBarAsync = async (): Promise<ReturnListResponse<{ id: number; title: string }>> => {
	return Repository(routeGetSidebar);
};
