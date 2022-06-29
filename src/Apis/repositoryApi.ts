import axiosClient from './clientAxios';
import { ApiMethods, ApiRoutes } from './interfaces/methodApi.interface';
const Repository = async (
	route: ApiRoutes,
	payload: {
		params?: Record<string, unknown>;
		body?: Record<string, unknown>;
	} = {
		params: {},
		body: {}
	},
	optional: Record<string, unknown> = {}
): Promise<any> => {
	switch (route.method) {
		case ApiMethods.GET:
			return await axiosClient.get(route.url, {
				params: payload.params
			});
		case ApiMethods.POST:
			return await axiosClient.post(route.url, payload.body, {
				params: payload.params
			});
		case ApiMethods.PUT:
			return await axiosClient.put(route.url, payload.body, {
				params: payload.params
			});
		case ApiMethods.PATCH:
			return await axiosClient.patch(route.url, payload.body, {
				params: payload.params
			});
		case ApiMethods.DELETE:
			return await axiosClient.delete(route.url, {
				params: payload.params
			});
		default:
			break;
	}
};
export default Repository;
