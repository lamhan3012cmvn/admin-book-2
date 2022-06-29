import {
	ApiMethods,
	ApiRoutes
} from '../../../../Apis/interfaces/methodApi.interface';
import { ReturnListResponse } from '../../../../Apis/interfaces/response.interface';
import Repository from '../../../../Apis/repositoryApi';
import { ProductModel } from '../../../../Models/product.model';

const routeFUser: ApiRoutes = {
	method: ApiMethods.GET,
	url: 'admin/users'
};
export const FUser = async ({
	pageNo = 0
}: {
	pageNo: number;
}): Promise<Array<ReturnListResponse<any>>> => {
	return Repository(routeFUser, {
		params: {
			pageNo
		}
	});
};
