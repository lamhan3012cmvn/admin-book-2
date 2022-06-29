import { CategoryModel } from './../../../Models/caterogy.model';
import { createStore, createHook, Action, defaults } from 'react-sweet-state';
defaults.devtools = true;
type State = {
	listCategory: Array<CategoryModel>;
	loading: boolean;
};
type Actions = typeof actions;

const initialState: State = {
	listCategory: [],
	loading: false
};

const setLoading =
	(loaded: boolean): Action<State> =>
	({ setState, getState }) => {
		setState({ ...getState(), loading: loaded });
	};

const setListCategory =
	(list: Array<CategoryModel>): Action<State> =>
	({ setState, getState }) => {
		setState({ ...getState(), listCategory: list });
	};

const actions = {
	setLoading,
	setListCategory
};

const Store = createStore<State, Actions>({
	initialState,
	actions,
	name: 'category'
});

export const useCategoryContext = createHook(Store);
