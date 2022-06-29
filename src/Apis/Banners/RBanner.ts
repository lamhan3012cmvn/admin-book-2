import { BannerModel } from '../../Models/banner.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnListResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeGetBanner: ApiRoutes = {
	method: ApiMethods.GET,
	url: 'admin/banners'
};
export const getBannerAsync = async (
): Promise<ReturnListResponse<BannerModel>> => {
	return Repository(routeGetBanner, {
	});
};
