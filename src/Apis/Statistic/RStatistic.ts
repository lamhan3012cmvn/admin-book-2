import { StatisticModel } from '../../Models/statistic.model';
import { ApiMethods, ApiRoutes } from '../interfaces/methodApi.interface';
import {
	ReturnListResponse,
	ReturnResponse
} from '../interfaces/response.interface';
import Repository from '../repositoryApi';

const routeGetStatistic: ApiRoutes = {
	method: ApiMethods.GET,
	url: 'admin/statistics'
};
export const getStatisticAsync = async (): Promise<
	ReturnResponse<StatisticModel>
> => {
	return Repository(routeGetStatistic);
};
