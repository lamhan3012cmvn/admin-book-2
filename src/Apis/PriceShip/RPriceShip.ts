import { ReturnResponse } from './../interfaces/response.interface';
import { PriceShipModel } from '../../Models/priceShip.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnListResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeGetPriceShip: ApiRoutes = {
	method: ApiMethods.GET,
	url: 'admin/priceShips'
};
export const getPriceShipAsync = async (pageNo=0): Promise<
	ReturnResponse<{
		datas: PriceShipModel[];
		totalItem: number;
	}>
> => {
	return Repository(routeGetPriceShip,{params:{pageNo}});
};
