import { PriceShipModel } from '../../Models/priceShip.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import { ReturnListResponse, ReturnResponse } from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeUpdatePriceShip: ApiRoutes = {
	method: ApiMethods.PATCH,
	url: 'admin/priceShips'
};
export const updatePriceShipAsync = async (obj:any): Promise<ReturnResponse<{
	datas: PriceShipModel[];
	totalItem: number;
}>> => {
	return Repository(routeUpdatePriceShip,{
    body: obj
  });
};
