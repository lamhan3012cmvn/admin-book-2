import { createStore, createHook, Action } from 'react-sweet-state';
import { PriceShipModel } from '../Models/priceShip.model';

type State = {
	priceShip: Array<PriceShipModel>;
	priceShipDetail: PriceShipModel;
	loading: boolean;
	totalPage: number;
	pageNo: number;
};
type Actions = typeof actions;

const initialState: State = {
	priceShip: [],
	priceShipDetail: undefined,
	loading: false,
	totalPage: 0,
	pageNo: 1
};

const setPriceShip =
	(priceShip: Array<PriceShipModel>, totalPage: number): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			priceShip: priceShip,
			totalPage: totalPage
		});
	};

const setPriceShipDetail =
	(priceShipDetail: PriceShipModel): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			priceShipDetail: priceShipDetail
		});
	};
const setPageNo =
	(pageNo: number): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			pageNo: pageNo
		});
	};
const actions = {
	setPriceShip,
	setPriceShipDetail,
	setPageNo
};

export const selector = (state: State) => {
	return {
		priceShip: state.priceShip || [],
		priceShipDetail: state.priceShipDetail,
		totalPage: state.totalPage,
		pageNo: state.pageNo
	};
};
const Store = createStore<State, Actions>({
	initialState,
	actions
});

export const priceShipCtx = createHook(Store, {
	selector
});
