import { createStore, createHook, Action } from 'react-sweet-state';
import {
	ProductDetailModel,
	ProductModel
} from '../../../Models/product.model';

type State = {
	products: Array<any>;
	productDetail: any;
	idProduct: number;
	totalPage: number;
	pageNo: number;
};
type Actions = typeof actions;

const initialState: State = {
	products: [],
	productDetail: null,
	idProduct: -1,
	totalPage: 0,
	pageNo: 1
};

const getProductSuccess =
	(payload: Array<any>, totalPage: number): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			products: payload,
			totalPage: totalPage
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

const getProductError =
	(): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			products: []
		});
	};

const setIdProduct =
	(id: number): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			idProduct: id
		});
	};

const setProductDetail =
	(payload: ProductDetailModel): Action<State> =>
	({ setState, getState }) => {
		setState({ ...getState(), productDetail: payload });
	};
const actions = {
	getProductSuccess,
	getProductError,
	setProductDetail,
	setIdProduct,
	setPageNo
};

export const selector = (state: State) => {
	return {
		products: state.products,
		productDetail: state.productDetail,
		product: state.products.find(product => product.id === state.idProduct),
		totalPage: state.totalPage,
		pageNo: state.pageNo
	};
};

const Store = createStore<State, Actions>({
	initialState,
	actions
});

export const productCtx = createHook(Store, { selector });
