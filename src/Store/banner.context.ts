import { createStore, createHook, Action } from 'react-sweet-state';
import { BannerModel } from '../Models/banner.model';

type State = {
	banners: Array<BannerModel>;
	idBanner: number;
	loading: boolean;
};
type Actions = typeof actions;

const initialState: State = {
	banners: [],
	idBanner: 0,
	loading: false
};

const setBanners =
	(banners: Array<BannerModel>): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			banners: banners
		});
	};

const setIdBanner =
	(idBanner: number): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			idBanner: idBanner
		});
	};

const actions = {
	setBanners,
	setIdBanner
};

export const selector = (state: State) => {
	return {
		banners: state.banners || [],
		banner: state.banners.find(banner => banner.id === state.idBanner)
	};
};
const Store = createStore<State, Actions>({
	initialState,
	actions
});

export const bannerCtx = createHook(Store, {
	selector
});
