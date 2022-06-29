import { PriceShipModel } from '../../Models/priceShip.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import {
	ReturnListResponse,
	ReturnResponse
} from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeDeletePriceShip: ApiRoutes = {
	method: ApiMethods.DELETE,
	url: 'admin/priceShips'
};
export const deletePriceShipAsync = async (
	id: number
): Promise<
	ReturnResponse<{
		datas: PriceShipModel[];
		totalItem: number;
	}>
> => {
	return Repository(routeDeletePriceShip, { params: { id } });
};
