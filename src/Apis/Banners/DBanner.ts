import { BannerModel } from '../../Models/banner.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnListResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeDeleteBanner: ApiRoutes = {
	method: ApiMethods.DELETE,
	url: 'admin/banners'
};
export const deleteBannerAsync = async (params: {
	id: string;
}): Promise<ReturnListResponse<BannerModel>> => {
	return Repository(routeDeleteBanner, {
		params: params
	});
};
