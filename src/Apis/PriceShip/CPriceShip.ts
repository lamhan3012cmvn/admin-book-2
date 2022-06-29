import { PriceShipModel } from '../../Models/priceShip.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import {
	ReturnListResponse,
	ReturnResponse
} from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeCreatePriceShip: ApiRoutes = {
	method: ApiMethods.POST,
	url: 'admin/priceShips'
};
export const createPriceShipAsync = async (obj: {
	province: string;
	priceShip: number;
}): Promise<
	ReturnResponse<{
		datas: PriceShipModel[];
		totalItem: number;
	}>
> => {
	return Repository(routeCreatePriceShip, { body: obj });
};
