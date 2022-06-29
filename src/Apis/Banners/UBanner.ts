import { BannerModel } from '../../Models/banner.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnListResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeCreateBanner: ApiRoutes = {
	method: ApiMethods.PATCH,
	url: 'admin/banners'
};
export const updateBannerAsync = async (payload: {
	id: number;
	url: string;
	title: string;
	desc: string;
}): Promise<ReturnListResponse<BannerModel>> => {
	return Repository(routeCreateBanner, {
		body: payload
	});
};
