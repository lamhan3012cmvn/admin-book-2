import { createStore, createHook, Action } from 'react-sweet-state';
import { BillManagerModel, BillDetailModel } from '../Models/billManager.model';

type State = {
	bills: Array<BillManagerModel>;
	billDetail: BillDetailModel;
	billManager: BillManagerModel;
	loading: boolean;
	totalPage: number;
	pageNo: number;
};
type Actions = typeof actions;

const initialState: State = {
	bills: [],
	billDetail: undefined,
	billManager: undefined,
	loading: false,
	totalPage: 0,
	pageNo: 1
};

const setBillManager =
	(bills: Array<BillManagerModel>, totalPage: number): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			bills: bills,
			totalPage: totalPage
		});
	};

const setBillDetail =
	(billDetail: BillDetailModel): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			billDetail: billDetail
		});
	};

const setBillManagerDetail =
	(billManager: BillManagerModel): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			billManager: billManager
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
	setBillManager,
	setBillDetail,
	setBillManagerDetail,
	setPageNo
};

export const selector = (state: State) => {
	return {
		bills: state.bills || [],
		billDetail: state.billDetail || undefined,
		billManager: state.billManager || undefined,
		totalPage: state.totalPage,
		pageNo: state.pageNo
	};
};
const Store = createStore<State, Actions>({
	initialState,
	actions
});

export const billManagerCtx = createHook(Store, {
	selector
});
