import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeUpdatePassword: ApiRoutes = {
	method: ApiMethods.POST,
	url: '/users/updatePassword'
};
export const updatePasswordAsync = async ({
	forgotPasswordCode,
	newPassword
}: {
	newPassword: string;
	forgotPasswordCode: string;
}): Promise<ReturnResponse<boolean>> => {
	return Repository(routeUpdatePassword, {
		body: {
			forgotPasswordCode,
			newPassword
		}
	});
};
